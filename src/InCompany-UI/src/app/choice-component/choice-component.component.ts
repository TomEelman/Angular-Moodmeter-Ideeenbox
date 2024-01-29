import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from '../services/header.service';
import { FooterService
 } from '../services/footer.service';
@Component({
  selector: 'app-choice-component',
  templateUrl: './choice-component.component.html',
  styleUrls: ['./choice-component.component.scss'],
})
export class ChoiceComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private headerService: HeaderService, private footerService: FooterService) {
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
          case 'myideas':
            this.router.navigate(['/ideabox/my-ideas']);
            break;
        }
      });
  }

  ngOnInit(): void {
    this.headerService.setInterFace([]);
    this.headerService.setTitle('Home');
    this.footerService.setInterFace([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
