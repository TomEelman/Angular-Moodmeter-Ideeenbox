import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { iconObject } from '../../shared/icon-types';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { Location } from '@angular/common';
import { LocalstorageService } from '../../services/localstorage.service';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.scss'],
})
export class CreateIdeaComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public title: string = '';
  public description: string = '';

  constructor(
    private router: Router, 
    private headerService: HeaderService, 
    private location: Location, 
    private ideaService: IdeaService,
    private localStorageService: LocalstorageService,
    private footerService: FooterService
    ) 
    {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'home':
            this.router.navigate(['/choice']);
            break;
          case 'back':
            this.router.navigate(['/ideabox']);
            break;
          case 'submit':
            this.saveIdea()
            break;
        }
      });

      this.footerService.footerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'myideas':
            this.router.navigate(['/ideabox/my-ideas']);
            break;
        }
      });
  }

  ngOnInit(): void {
    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Ideeën',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
      {
        btn: 'submit',
        label: '',
        icon: iconObject.iconSubmit,
        position: 'right',
      }
    ]);
    this.headerService.setTitle('Creëer idee');

    this.footerService.setInterFace([
      {
        btn: 'myideas',
        label: '',
        icon: iconObject.iconLightBulp,
        position: 'left',
      }
    ]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createIdeaId(): string {
    const timestampInNanoseconds = new Date().getTime() * 1e6; 
    return timestampInNanoseconds.toString();
  }

  private getUserInfo(): { email: string, username: string } {
    const user = this.localStorageService.getUser();
    return user ? { email: user.email, username: user.username } : { email: '', username: '' };
  }
 
  public saveIdea(): void {
    if (this.title.trim() === '' || this.description.trim() === '') {
      alert('Vul allebei de vakken in...')
    } else {
      const userInfo = this.getUserInfo();
      const timestamp = new Date();
      const idea = new Idea({ 
        title: this.title, 
        description: this.description, 
        timestamp: timestamp,
        userId: userInfo.email,
        userName: userInfo.username,
        voteNumber: 0,
        commentsNumber: 0,
        ideaId: this.createIdeaId(),
        upvotes: [],
        downvotes: []
      });
      this.ideaService.saveIdea(idea);
      this.location.back();
    }
  }
}

