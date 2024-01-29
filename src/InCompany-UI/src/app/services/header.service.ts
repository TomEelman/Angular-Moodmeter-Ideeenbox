import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

export type InterfaceItem = {
  btn: string;
  label: string;
  icon: IconDefinition;
  position: string;
};
@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  public headerEventSubject = new Subject<string>();
  public headerEvent$ = this.headerEventSubject.asObservable();

  public headerInterfaceSubject = new Subject<any>();
  public headerInterface$ = this.headerInterfaceSubject.asObservable();

  public headerTitleSubject = new Subject<any>();
  public headerTitle$ = this.headerTitleSubject.asObservable();

  public setInterFace(arr: InterfaceItem[]) {
    this.headerInterfaceSubject.next(arr);
  }

  public setTitle(title: string): void {
    this.headerTitleSubject.next(title);
  }
}
