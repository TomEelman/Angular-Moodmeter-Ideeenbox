import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { FooterService } from '../../services/footer.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { iconObject } from '../../shared/icon-types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private headerService: HeaderService, private footerService: FooterService) {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/choice']);
            break;
          case 'add':
            this.router.navigate(['/ideabox/create-idea']);
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
        label: 'Home',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
      { btn: 'add',
        label: '', 
        icon: iconObject.iconPlus, 
        position: 'right' 
      }
    ]);
    this.headerService.setTitle('Ideeën');

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
}
