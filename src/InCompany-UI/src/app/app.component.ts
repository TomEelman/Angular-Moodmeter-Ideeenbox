import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MoodService } from './services/mood.service';
import { LocalstorageService } from './services/localstorage.service';
import { MockDataService } from './services/mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'InCompany-UI';
  public showOnHomePage: boolean = false;
  public isFooterActive: boolean = true;
  public isHeaderActive: boolean= true;
 
  constructor(private router: Router, private localStorageService: LocalstorageService, private moodService: MoodService, private mockDataService: MockDataService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showOnHomePage = (event.url === '/');
      }
    });

    this.mockDataService.fillMockData();
  }

  ngOnInit(): void {
    const user = this.localStorageService.getUser();
    const userId = user?.email;

    this.moodService.checkTimer(userId!);
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeFooter();
      }
    });
  }

 private activeFooter(): void {
    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl === '/department') {
      this.isFooterActive = false;
      this.isHeaderActive = false;
    } else {
      this.isFooterActive = true;
      this.isHeaderActive = true;
    }
  }
}
