import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoodService } from '../../services/mood.service';
import { Router } from '@angular/router';
import { Subject, delay, takeUntil, timer } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { iconObject } from '../../shared/icon-types';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-create-mood',
  templateUrl: './create-mood.component.html',
  styleUrls: ['./create-mood.component.scss'],
})
export class CreateMoodComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedMoodValue: number = 3;
  public isSliderDisabled: boolean = false;
  private position = '';

  constructor(
    public moodService: MoodService,
    private router: Router,
    private headerService: HeaderService,
    private localStorageService: LocalstorageService
  ) {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/moodmeter']);
            break;
          case 'submit':
            this.addMood();
            break;
        }
      });

    const userId = this.moodService.getUserId() ?? '';
    if (this.moodService.moodSubmitted) {
      this.moodService.startTimer(userId);
    }
    this.moodService.moodSubmitTimer$.subscribe(timer => {
      this.isSliderDisabled = timer > 0;
    })
  }

  ngOnInit(): void {
    this.checkLocalStorageTimer();

    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Moods',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
      {
        btn: 'submit',
        label: '',
        icon: iconObject.iconSubmit,
        position: this.position ,
      }
    ]);
    
    this.headerService.setTitle('Creëer mood');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addMood(): void {
    this.moodService.saveMood(this.selectedMoodValue);
    this.router.navigate(['/moodmeter']);
  }

  public onSelectedMoodChange(value: number): void {
    if (!this.isSliderDisabled) {
      this.selectedMoodValue = value;
      this.moodService.updateSelectedMood(value);
    }
  }

  public formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  private checkLocalStorageTimer(): void {
    const moodData = this.localStorageService.getMood();   

    if (moodData && moodData.moodTimer && moodData.moodTimer?.timer <= 0 || moodData === null) {
      this.position = 'right'; 
      
      this.headerService.setInterFace([
        {
          btn: 'back',
          label: 'Moods',
          icon: iconObject.iconAngleLeft,
          position: 'left',
        },
        {
          btn: 'submit',
          label: '',
          icon: iconObject.iconSubmit,
          position: this.position,
        }
      ]);
    }
  }
}
