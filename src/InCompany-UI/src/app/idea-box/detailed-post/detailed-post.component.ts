import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { iconObject } from '../../shared/icon-types';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { FooterService } from '../../services/footer.service';
import { User } from '../comment-sectie/comment-sectie.component';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.scss'],
})
export class DetailedPostComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public idea!: Idea | undefined;
  public iconArrowUp = iconObject.iconArrowUp;
  public iconArrowDown = iconObject.iconArrowDown;
  public posts: Idea[] = this.getIdeas();
  public iconUser = iconObject.iconUser;
  public iconTrash = iconObject.iconTrash;
  public user: any;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private ideasService: IdeaService,
    private activatedRoute: ActivatedRoute,
    private footerService: FooterService,
    private localStorageService: LocalstorageService
  ) {
    this.headerService.headerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'back':
            this.router.navigate(['/ideabox']);
            break;
        }
      });

    this.footerService.footerEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((btn: string) => {
        switch (btn) {
          case 'myideas':
            this.router.navigate(['/ideabox/my-ideas']);
            break;
        }
      });
  }

  ngOnInit(): void {
    this.headerService.setInterFace([
      {
        btn: 'back',
        label: 'Ideeën',
        icon: iconObject.iconAngleLeft,
        position: 'left',
      },
    ]);

    this.footerService.setInterFace([
      {
        btn: 'myideas',
        label: '',
        icon: iconObject.iconLightBulp,
        position: 'left',
      },
    ]);

    this.ideasService
      .getVoteUpdates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedIdea: Idea) => {
        this.idea = updatedIdea;
        this.idea.timeAgo = this.getTimeAgo(new Date(updatedIdea.timestamp));
      });

    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const ideaId = params['ideaId'];

        if (ideaId) {
          const foundIdea = this.ideasService
            .getIdeas()!
            .find((idea) => idea.ideaId === ideaId);

          if (foundIdea) {
            this.idea = foundIdea;
            this.idea.timeAgo = this.getTimeAgo(new Date(foundIdea.timestamp));
          }
        }
      });

    this.user = this.getUserInfo();
    this.headerService.setTitle('Idee details');
  }

  private getIdeas(): Idea[] {
    const ideas = this.ideasService.getIdeas() || [];
    return ideas.map((idea) => {
      const ideaInstance = new Idea(idea);
      ideaInstance.timestamp = idea.timestamp.toString();
      return ideaInstance;
    });
  }

  private getUserInfo(): User {
    const user = this.localStorageService.getUser();
    return user
      ? { email: user.email, username: user.username }
      : { email: '', username: '' };
  }

  public getTimeAgo(timestamp: Date): string {
    return this.ideasService.getTimeAgo(timestamp);
  }

  public vote(idea: Idea, voteType: 'upvote' | 'downvote'): void {
    this.posts = this.ideasService.vote(idea, voteType, this.posts);
  }

  public formatVotes(votes: number): string {
    return this.ideasService.formatVotes(votes);
  }

  public hasVoted(post: Idea, voteType: 'upvote' | 'downvote'): boolean {
    return this.ideasService.hasVoted(post, voteType);
  }

  public deleteIdea(ideaId: string): void {
    this.ideasService.deleteIdea(ideaId);
    this.router.navigate(['/ideabox']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
