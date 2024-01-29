import { Component, ChangeDetectorRef } from '@angular/core';
import { iconObject } from '../icon-types';
import { FooterService, InterfaceItem } from '../../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public settingsIcon = iconObject.iconCog;
  public btnLeft?: InterfaceItem;
  public btnRight?: InterfaceItem;

  constructor(
    private footerService: FooterService,
    private changeDetectorRef: ChangeDetectorRef
      ) {
        this.footerService.footerInterface$.subscribe((btnArr: InterfaceItem[]) => {
          this.handleButtons(btnArr);
          this.changeDetectorRef.detectChanges();
        });
    
  }

  private handleButtons(btnArr: InterfaceItem[]): void {
    this.btnLeft = undefined;
    this.btnRight = undefined;

    btnArr.forEach((item: InterfaceItem) => {
      if (item.position === 'left') {
        this.btnLeft = item;
      }

      if (item.position === 'right') {
        this.btnRight = item;
      }
    });
  }

  public onClick(btn: InterfaceItem): void {
    this.footerService.footerEventSubject.next(btn.btn);
  }
}
