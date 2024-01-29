import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderService, InterfaceItem } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public title: string = '';
  public btnLeft?: InterfaceItem;
  public btnRight?: InterfaceItem;

  constructor(
    private headerService: HeaderService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.headerService.headerInterface$.subscribe((btnArr: InterfaceItem[]) => {
      this.handleButtons(btnArr);
      this.changeDetectorRef.detectChanges();
    });

    this.headerService.headerTitle$.subscribe((title: string) => {
      this.title = title;
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
    this.headerService.headerEventSubject.next(btn.btn);
  }
}
