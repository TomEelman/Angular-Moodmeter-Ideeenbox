import { Component } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { Router } from '@angular/router';
import { DropDownItem } from '../shared/drop-down/drop-down.component';
import { userList } from '../../config/user-list';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss']
})
export class SelectDepartmentComponent {
  public selectedDepartment: string = '';
  public dropDownItems: DropDownItem[] = [
    { label: 'Maak uw keuze', value: '' },
    { label: 'Application Development', value: 'appDevelopment' },
    { label: 'Business Development', value: 'businessDevelopment' },
    { label: 'Experience', value: 'experience' },
    { label: 'Sales and Marketing', value: 'salesAndMarketing' },
    { label: 'KCC', value: 'kcc' },
    { label: 'Essenzo', value: 'essenzo' }
  ];

  constructor(private router: Router, private localStorageService: LocalstorageService) { }

  public saveDepartment(): void {
    if (this.selectedDepartment) {
      const user = this.localStorageService.getUser();

      if (user) {
        const matchingUser = userList.find(u => u.email === user.email && u.username === user.username);

        if (matchingUser && matchingUser.department === this.selectedDepartment) {
          user.department = this.selectedDepartment;
          this.localStorageService.saveUser(user);
          this.router.navigate(['/choice']);
        } else {
          alert('Geselecteerde afdeling is niet afgestemd op de gebruikergegevens.');
        }
      } else {
        alert('Gebruiker niet gevonden. Vul deze alstublieft eerst in');
      }
    } else {
      alert('Selecteer een afdeling');
    }
  }

  public onSelectDropDownItem(department: string) {
    this.selectedDepartment = department;
  }
}