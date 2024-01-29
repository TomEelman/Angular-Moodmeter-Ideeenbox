import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { User } from '../models/user.model';
import { userList } from '../../config/user-list';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  public email: string = '';
  public username: string = '';

  constructor(private router: Router, private localStorageService: LocalstorageService) {}

  private isValidEmail(): boolean {
    const startsWithLetter = /^[a-zA-Z]/.test(this.email);

    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailValidation.test(this.email);

    return startsWithLetter && isValidFormat;
  }

  private isValidName(): boolean {
    return typeof this.username === 'string' && this.username.trim() !== '' && !/\d/.test(this.username);
  }

  private isUserValid(): boolean {
    const user = new User({ email: this.email, department: '', username: this.username });

    return userList.some(u => u.email === user.email && u.username === user.username);
  }
 
  public saveUserData(): void {
    if (this.isValidEmail() && this.isValidName() && this.isUserValid()) {
      const user = new User({ email: this.email, department: '', username: this.username });
      this.localStorageService.saveUser(user);
      this.router.navigate(['/department']);
    } else {
      alert('ongeldig naam of e-mailadres');
    }
  }

}
