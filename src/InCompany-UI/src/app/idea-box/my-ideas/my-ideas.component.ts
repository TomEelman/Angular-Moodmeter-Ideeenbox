import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ListItem } from '../../shared/list-item/list-item.component';
import { IdeaService } from '../../services/idea.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { Subject, takeUntil } from 'rxjs';
import { iconObject } from '../../shared/icon-types';
import { FooterService } from '../../services/footer.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-my-ideas',
  templateUrl: './my-ideas.component.html',
  styleUrls: ['./my-ideas.component.scss'],
})
export class MyIdeasComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public myideas: ListItem[] = [];

  constructor(
    private router: Router, 
    private headerService: HeaderService,
    private ideaService: IdeaService,
    private footerService: FooterService,
    private localStorageService: LocalstorageService) 
    {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/ideabox']);
            break;
          case 'add':
            this.router.navigate(['/ideabox/create-idea']);
            break;
        }
      });
  }

  ngOnInit(): void {    
    this.loadIdeas();
    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Ideeën',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
      {
        btn: 'add',
        label: '',
        icon: iconObject.iconPlus,
        position: 'right',
      }
    ]);
    this.headerService.setTitle('Mijn ideeën');
    this.footerService.setInterFace([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadIdeas(): void {
    const user = this.localStorageService.getUser();
  
    if (user) {
      const userId = user.email;
      const ideas = this.ideaService.getIdeas();
  
      if (ideas) {
        const userIdeas = ideas.filter((idea) => idea.userId === userId);
  
        this.myideas = userIdeas.map((idea) => ({
          icon: faChevronRight,
          text: idea.title,
          ideaId: idea.ideaId
          
        }));        
      }
    }
  }
  
  toDetailsPost(ideaId?: string) {
    if (ideaId) {
      this.router.navigate(['/ideabox/detail-post', ideaId]);
    }
  }
}
