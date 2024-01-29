import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { userList } from '../../config/user-list';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private localStorageService: LocalstorageService) {}

  isAuthenticated(): boolean {
    const user = this.localStorageService.getUser();
    return !!user && userList.some(u => u.email === user.email && u.username === user.username);
  }
}
