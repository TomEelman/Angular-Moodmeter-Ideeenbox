import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListItem } from '../../list-item/list-item.component';
import { HeaderService } from '../../../services/header.service';
import { Subject, takeUntil } from 'rxjs';
import { iconObject } from '../../icon-types';
import { LocalstorageService } from '../../../services/localstorage.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { FooterService } from '../../../services/footer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router, 
    private headerService: HeaderService, 
    private localStorageService: LocalstorageService, 
    private authService: AuthenticationService, 
    private footerService: FooterService
    ) {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/choice']);
            break;
        }
      });
  }

  ngOnInit(): void {
    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Home',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      }
    ]);
    this.headerService.setTitle('Settings');
    this.footerService.setInterFace([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public settings: ListItem[] = [
    { text: 'Afmelden', icon: iconObject.iconArrowRightFromBracket, warning: true },
  ];

  public handleItemClick(itemText: string): void {
    if (itemText === 'Afdeling wijzigen') {
      this.router.navigate(['/department']);
    } else if (itemText === 'Afmelden') {
      this.localStorageService.clearUserOnClick();
      this.router.navigate(['']);
    }
  }
}
