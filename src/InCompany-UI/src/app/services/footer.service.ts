import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type InterfaceItem = {
  btn: string;
  label: string;
  icon: IconDefinition;
  position: string;
};

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  public footerEventSubject = new Subject<string>();
  public footerEvent$ = this.footerEventSubject.asObservable();

  public footerInterfaceSubject = new Subject<any>();
  public footerInterface$ = this.footerInterfaceSubject.asObservable();

  public setInterFace(arr: InterfaceItem[]) {
    this.footerInterfaceSubject.next(arr);
  }
}
