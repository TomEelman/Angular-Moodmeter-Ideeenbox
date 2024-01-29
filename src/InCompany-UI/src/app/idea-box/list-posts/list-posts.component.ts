import { Component, OnInit } from '@angular/core';
import { iconObject } from '../../shared/icon-types';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss'],
})
export class ListPostsComponent implements OnInit {
  public iconArrowUp = iconObject.iconArrowUp;
  public iconArrowDown = iconObject.iconArrowDown;
  public iconMessage = iconObject.iconMessage;
  public posts: Idea[] = this.getIdeas();
  public iconUser = iconObject.iconUser;

  

  constructor(
    private ideasService: IdeaService,
  ) {}

  ngOnInit(): void {
    const ideas = this.getIdeas();
    
    this.posts = ideas.sort((a, b) => {
      if (b.voteNumber === a.voteNumber) {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        return b.voteNumber - a.voteNumber;
      }
    });

    this.updateTimeAgo();
  }

  private getIdeas(): Idea[] {
    const ideas = this.ideasService.getIdeas() || [];
    return ideas.map((idea) => {
      const ideaInstance = new Idea(idea);
      ideaInstance.timestamp = idea.timestamp.toString();
      return ideaInstance;
    });
  }

  public updateTimeAgo(): void {
    this.posts.forEach((post: any) => {
      const postDate = new Date(post.timestamp);
      post.timeAgo = this.getTimeAgo(postDate);
    });
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
}
