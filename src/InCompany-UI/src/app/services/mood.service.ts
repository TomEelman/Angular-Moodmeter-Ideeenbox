import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { BehaviorSubject, takeWhile, interval, Subscription } from 'rxjs';
import { Mood } from '../models/mood.model';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  public moodSubmitted: boolean = false;
  public timer: number = 0;

  public timerSubscription?: Subscription;

  private selectedMoodValueSubject = new BehaviorSubject<number>(3);
  public selectedMoodValue$ = this.selectedMoodValueSubject.asObservable();

  public moodSubmitTimerSubject = new BehaviorSubject<number>(this.timer);
  public moodSubmitTimer$ = this.moodSubmitTimerSubject.asObservable();

  constructor(private localStorageService: LocalstorageService) {}

  public getUserId(): string | undefined {
    const user = this.localStorageService.getUser();
    return user?.email;
  }

  public updateSelectedMood(value: number): void {
    this.selectedMoodValueSubject.next(value);
  }

  public saveMood(moodValue: number): void {
    const user = this.localStorageService.getUser();
    const userId = user?.email;
    let timer = this.getTimerFromLocalStorage(userId!);

    if (user && timer === 0) {
      const timestamp = new Date().toISOString();
      const moodData = { moodValue, timestamp, userId: user.email, userDepartment: user.department };

      const mood = this.localStorageService.getMood() || new Mood({});

      if (!mood.moods) {
        mood.moods = [];
      }

      mood.moods.push(moodData);

      this.localStorageService.saveMood(mood);
      this.selectedMoodValueSubject.next(moodValue);

      this.moodSubmitted = true;
      this.startTimer(user.email);
    } 
  }

  public checkTimer(userId: string): void {
     this.timer = this.getTimerFromLocalStorage(userId);

    if (this.timer > 0) {
      this.moodSubmitted = true;
      this.startTimer(userId);
    }
  }

  public getMoodFromLocalStorage(): any[] {
    const storedMoodData = this.localStorageService.getMood();
    let moods: any[] = [];

    if (storedMoodData) {
      const moodsArray = storedMoodData;
      moods = moodsArray.moods || [];
    }

    return moods;
  }

  public startTimer(userId: string): void {
    // 43200 seconden is gelijk aan 12 uur
    const timerDurationInSeconds = 43200;
    let timer = this.getTimerFromLocalStorage(userId);

    if (timer === 0) {
      timer = timerDurationInSeconds;
      this.saveTimerInLocalStorage(userId, timer);
    }

    this.timerSubscription = interval(1000)
      .pipe(
        takeWhile(() => timer > 0)
      )
      .subscribe(() => {
        timer--;
        this.moodSubmitTimerSubject.next(timer);
        this.saveTimerInLocalStorage(userId, timer);

        if (timer === 0) {
          this.moodSubmitted = false;
        }
      })
  }

  public saveTimerInLocalStorage(userId: string, timer: number): void {
    const mood = this.localStorageService.getMood();

    if (mood) {
      mood.moodTimer = { userId, timer };
      this.localStorageService.saveMood(mood);
    }
  }

  public getTimerFromLocalStorage(userId: string): number {
    const mood = this.localStorageService.getMood();

    if (mood?.moodTimer && mood.moodTimer.userId === userId) {
      return mood.moodTimer.timer;
    }
    return 0;
  }
}