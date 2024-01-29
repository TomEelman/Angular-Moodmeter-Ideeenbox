import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropDownItem } from '../../shared/drop-down/drop-down.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { iconObject } from '../../shared/icon-types';
import { LocalstorageService } from '../../services/localstorage.service';
import { MoodService } from '../../services/mood.service';
import { User } from '../../models/user.model';

export interface MoodPole {
  userId: string;
  userDepartment: string;
  moodValue: number;
  timestamp: string;
  height?: number;
  margin?: number;
  barWidth?: number;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public departmentChoice: DropDownItem[] = [
    { label: 'Jouw moods', value: 'yourMoods' },
    { label: 'Application Development', value: 'appDevelopment' },
    { label: 'Business Development', value: 'businessDevelopment' },
    { label: 'Experience', value: 'experience' },
    { label: 'Sales and Marketing', value: 'salesAndMarketing' },
    { label: 'KCC', value: 'kcc' },
    { label: 'Essenzo', value: 'essenzo' }
  ];
  public dateChoice: DropDownItem[] = [
    { label: 'Week overzicht', value: 'week' },
    { label: 'Maand overzicht', value: 'month' }
  ];
  public weekDaysAxis: string[] = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
  public moodAxis: number[] = [0, 1, 2, 3, 4, 5];
  public moodData!: MoodPole[];
  public averageMoodData: { [key: string]: number[] } = {};
  public moodDepartmentData: { [key: string]: { value: number; margin: number } } = {};
  private user!: User | null;
  public currentYear!: number;
  public currentMonthNumber!: number;
  public currentWeekNumber!: number;
  public selectedDropdownDepartment: string = 'yourMoods';
  public selectedDropdownTime: string = 'week';
  public userMoods!: MoodPole[];
  public departmentViewMessage: string = "Er moeten meer dan 5 moods ingevuld zijn";
  public moodAverage: number = 0;
  public backArrowLeft = iconObject.iconAngleLeft;
  public backArrowRight = iconObject.iconAngleRight;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    public moodService: MoodService,
    public localStorage: LocalstorageService
  ) {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/choice']);
            break;
          case 'add':
            this.router.navigate(['/moodmeter/set-mood']);
            break;
        }
      });
  }

  ngOnInit() {
    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Home',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
      {
        btn: 'add',
        label: '',
        icon: iconObject.iconPlus,
        position: 'right',
      },
    ]);
    this.headerService.setTitle('Moods');

    this.moodAxis.reverse();

    this.getUser();
    this.calcDateInfo();
    this.displayMoods();
  }

  public onDepartmentSelect(selectedDepartmentView: string): void {
    this.moodDepartmentData = {};
    this.selectedDropdownDepartment = selectedDepartmentView;
    this.displayMoods();
  }

  public onTimeSelect(slectedTimeFrame: string): void {
    this.selectedDropdownTime = slectedTimeFrame;
    this.displayMoods();
  }

  public getMoodData() {
    this.moodData = this.moodService.getMoodFromLocalStorage();
  }

  public getUser() {
    this.user = this.localStorage.getUser();
  }

  private calcDateInfo() {
    const timestamp = new Date();
    this.currentYear = timestamp.getFullYear();
    this.currentWeekNumber = this.calcWeekNumber(timestamp);
    this.currentMonthNumber = timestamp.getMonth() + 1;
  }

  private calcWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const daysSinceStart = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysSinceStart / 7) + 1;

    return weekNumber;
  }

  private calcMoodAverage() {
    let totalMoodValue = 0;
    let numberOfMoods = 0;
  
    this.moodData.forEach(mood => {
      const moodTimestamp = new Date(mood.timestamp);
      const year = moodTimestamp.getFullYear();
      const week = this.calcWeekNumber(moodTimestamp);
      const month = moodTimestamp.getMonth() + 1;
  
      if (
        (this.selectedDropdownDepartment === 'yourMoods' && mood.userId === this.user?.email) ||
        (this.selectedDropdownDepartment !== 'yourMoods' && mood.userDepartment === this.selectedDropdownDepartment)
      ) {
        if (
          (this.selectedDropdownTime === 'week' && year === this.currentYear && month === this.currentMonthNumber && week === this.currentWeekNumber) ||
          (this.selectedDropdownTime === 'month' && year === this.currentYear && month === this.currentMonthNumber)
        ) {
          const moodValues = mood.moodValue;
  
          totalMoodValue += moodValues;
          numberOfMoods++;
        }
      }
    });
  
    const moodAverage = numberOfMoods > 0 ? totalMoodValue / numberOfMoods : 0;
    this.moodAverage = Math.round(moodAverage);
  }
  

  private displayMoods() {
    this.filterMoodData();
    this.calcMoodAverage();

    if (this.selectedDropdownDepartment === "yourMoods") {
      this.displayPersonalMoods();
    } else {
      this.displayDepartmentMoods();
    }
  }

  private filterMoodData() {
    this.getMoodData();

    this.userMoods = this.moodData.filter(mood => {

      const userEmail = this.user?.email;
      const moodEmail = mood.userId;

      const moodDepartment = mood.userDepartment;
      const moodTimestamp = new Date(mood.timestamp);

      const year = moodTimestamp.getFullYear();

      if (this.selectedDropdownTime === "week") {
        const week = this.calcWeekNumber(moodTimestamp);

        if (this.selectedDropdownDepartment === "yourMoods") {
          return userEmail === moodEmail && week === this.currentWeekNumber && year === this.currentYear;
        } else {
          return moodDepartment === this.selectedDropdownDepartment;
        }
      } else {
        const month = moodTimestamp.getMonth() + 1;

        if (this.selectedDropdownDepartment === "yourMoods") {
          return userEmail === moodEmail && month === this.currentMonthNumber && year === this.currentYear;
        } else {
          return moodDepartment === this.selectedDropdownDepartment;
        }
      }
    });
  }

  private displayPersonalMoods() {
    this.filterMoodData();

    if (this.selectedDropdownTime === "week") {
      this.userMoods.forEach(mood => {
        const moodValue = mood.moodValue;
        const timestamp = new Date(mood.timestamp);
        const dayOfWeek = timestamp.getDay();

        mood.height = this.poleHeight(moodValue);
        mood.margin = this.poleMargin(dayOfWeek);

        this.hasMultipleMoods();
      });

    } else if (this.selectedDropdownTime === "month") {
      this.userMoods.forEach(mood => {
        const moodValue = mood.moodValue;
        const timestamp = new Date(mood.timestamp);
        const dayOfMonth = timestamp.getDate();

        mood.height = this.poleHeight(moodValue);
        mood.margin = this.poleMargin(dayOfMonth);
        mood.barWidth = 12.3;
      });
    }
  }

  private displayDepartmentMoods() {
    this.moodDepartmentData = {};
    this.averageMoodData = {};

    this.filterMoodData();

    this.userMoods.forEach(mood => {
      const timestamp = new Date(mood.timestamp);
      const specificDay = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}-${timestamp.getDate()}`;

      if (this.calcWeekNumber(timestamp) === this.currentWeekNumber) {
        if (!this.averageMoodData[specificDay]) {
          this.averageMoodData[specificDay] = [];
        }
        this.averageMoodData[specificDay].push(mood.moodValue);
      }
    });

    Object.keys(this.averageMoodData).forEach(specificDay => {
      const moodValues = this.averageMoodData[specificDay];
      const totalMoodValue = moodValues.reduce((acc, val) => acc + val, 0);
      const averageMoodValue = totalMoodValue / moodValues.length;

      this.moodDepartmentData[specificDay] = {
        value: Math.round(averageMoodValue),
        margin: new Date(specificDay).getDay()
      };
    });
  }

  private hasMultipleMoods(): void {
    const users = Array.from(new Set(this.moodData.map(mood => mood.userId)));

    users.forEach(userId => {
      const userMoods = this.moodData.filter(mood => mood.userId === userId);

      const daysWithMultipleMoods = Array.from(new Set(userMoods.map(mood => {
        const timestamp = new Date(mood.timestamp);
        return timestamp.getDate();
      })));

      daysWithMultipleMoods.forEach(dayOfMonth => {
        const moodsForDay = userMoods.filter(mood => {
          const timestamp = new Date(mood.timestamp);
          const year = timestamp.getFullYear();

          if (this.selectedDropdownDepartment === "yourMoods") {
            return timestamp.getDate() === dayOfMonth && this.calcWeekNumber(timestamp) === this.currentWeekNumber && year === this.currentYear;
          } else {
            return timestamp.getDate() && timestamp.getMonth() === dayOfMonth && this.currentMonthNumber;
          }
        });

        if (moodsForDay.length > 1) {
          const barWidth = 45 / moodsForDay.length;

          moodsForDay.forEach((innerMood, index) => {
            const timestamp = new Date(innerMood.timestamp);
            innerMood.margin = this.poleMargin(timestamp.getDay()) + index * 1.6;
            innerMood.barWidth = barWidth;
          });
        }
      });
    });
  }

  public getMoodDepartmentDataKeys(): string[] {
    return Object.keys(this.moodDepartmentData);
  }

  public dateChangeMinus() {
    if (this.selectedDropdownTime === "week") {
      if (this.currentWeekNumber > 1) {
        this.currentWeekNumber--;
      } else {
        this.currentYear--;
        this.currentWeekNumber = 52;
      }
    } else {
      if (this.currentMonthNumber > 1) {
        this.currentMonthNumber--;
      } else {
        this.currentYear--;
        this.currentMonthNumber = 12;
      }
    }
    this.displayMoods();
  }

  public dateChangePlus() {
    if (this.selectedDropdownTime === "week") {
      if (this.currentWeekNumber < 52) {
        this.currentWeekNumber++;
      } else {
        this.currentYear++;
        this.currentWeekNumber = 1;
      }
    } else {
      if (this.currentMonthNumber < 12) {
        this.currentMonthNumber++;
      } else {
        this.currentYear++;
        this.currentMonthNumber = 1;
      }
    }
    this.displayMoods();
  }

  public poleHeight(mood: number): number {
    switch (mood) {
      case 5:
        return 295;
      case 4:
        return 245;
      case 3:
        return 197;
      case 2:
        return 148;
      case 1:
        return 99;
      default:
        return 0;
    }
  }

  public poleMargin(day: number): number {
    switch (day) {
      //Sunday
      case 0:
        return 19.8;
      //Monday
      case 1:
        return 0;
      //Tuesday
      case 2:
        return 3.3;
      //Wednesday
      case 3:
        return 6.6;
      //Thursday
      case 4:
        return 9.9;
      //Friday
      case 5:
        return 13.2;
      //Saturday
      case 6:
        return 16.5;
      default:
        return 0;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}