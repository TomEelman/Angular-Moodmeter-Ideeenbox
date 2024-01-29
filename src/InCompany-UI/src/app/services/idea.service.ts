import { Injectable } from '@angular/core';
import { Idea } from '../models/idea.model';
import { LocalstorageService } from './localstorage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private voteUpdateSubject = new Subject<Idea>();

  constructor(private localStorageService: LocalstorageService) {}

  public saveIdea(idea: Idea) {
    this.localStorageService.saveIdea(idea);
  }

  public saveIdeas(ideas: Idea[]): void {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  public getIdeas(): Idea[] | null {
    return this.localStorageService.getIdeas();
  }

  public getVoteUpdates() {
    return this.voteUpdateSubject.asObservable();
  }

  public getTimeAgo(timestamp: Date): string {
    const dateNow = new Date();
    const seconds = Math.floor(
      (dateNow.getTime() - timestamp.getTime()) / 1000
    );

    const intervals = {
      jaar: 31536000,
      maand: 2592000,
      week: 604800,
      dag: 86400,
      uur: 3600,
      minuut: 60,
      second: 1,
    };

    let counter!: number;
    let unit!: string;

    for (const key in intervals) {
      if (intervals.hasOwnProperty(key)) {
        counter = Math.floor(seconds / (intervals as any)[key]);

        if (counter > 0) {
          unit = key;
          break;
        }
      }
    }

    if (counter === 1) {
      return `${counter} ${unit} geleden`;
    } else if (counter > 1) {
      return unit === 'minuut'
        ? `${counter} minuten geleden`
        : unit === 'jaar'
        ? `${counter} jaren geleden`
        : unit === 'uur'
        ? `${counter} uren geleden`
        : unit === 'week'
        ? `${counter} weken geleden`
        : `${counter} ${unit + 'en'} geleden`;
    } else {
      return '0 seconde geleden';
    }
  }

  public vote(
    idea: Idea,
    voteType: 'upvote' | 'downvote',
    posts: Idea[]
  ): Idea[] {
    const ideas = this.getIdeas() || [];
    const matchedIdea = ideas.find((i) => i.ideaId === idea.ideaId);

    if (!matchedIdea) {
      alert('Idee niet gevonden.');
      return posts;
    }

    const userInfo = this.localStorageService.getUser();

    if (!userInfo) {
      alert('Gebruikersinformatie niet beschikbaar.');
      return posts;
    }

    if (matchedIdea.userId === userInfo.email) {
      alert('Je kunt niet stemmen op je eigen idee.');
      return posts;
    }

    const userVotedUp = matchedIdea.upvotes.includes(userInfo.email);
    const userVotedDown = matchedIdea.downvotes.includes(userInfo.email);

    if (voteType === 'upvote') {
      if (userVotedUp) {
        matchedIdea.upvotes = matchedIdea.upvotes.filter(
          (email) => email !== userInfo.email
        );
        matchedIdea.voteNumber -= 1;
      } else {
        matchedIdea.upvotes.push(userInfo.email);
        matchedIdea.voteNumber += 1;

        if (userVotedDown) {
          matchedIdea.downvotes = matchedIdea.downvotes.filter(
            (email) => email !== userInfo.email
          );
          matchedIdea.voteNumber += 1;
        }
      }
    } else if (voteType === 'downvote') {
      if (userVotedDown) {
        matchedIdea.downvotes = matchedIdea.downvotes.filter(
          (email) => email !== userInfo.email
        );
        matchedIdea.voteNumber += 1;
      } else {
        matchedIdea.downvotes.push(userInfo.email);
        matchedIdea.voteNumber -= 1;

        if (userVotedUp) {
          matchedIdea.upvotes = matchedIdea.upvotes.filter(
            (email) => email !== userInfo.email
          );
          matchedIdea.voteNumber -= 1;
        }
      }
    }

    const updatedPosts = posts.map((post: any) =>
      post.ideaId === idea.ideaId
        ? { ...post, voteNumber: matchedIdea.voteNumber }
        : post
    );

    this.saveIdeas(ideas);

    this.voteUpdateSubject.next(matchedIdea);

    return updatedPosts;
  }

  public hasVoted(post: Idea, voteType: 'upvote' | 'downvote'): boolean {
    const userInfo = this.localStorageService.getUser();

    if (userInfo) {
      const voted = this.getIdeas() || [];

      if (voteType === 'upvote') {
        return voted.some(
          (idea) =>
            idea.ideaId === post.ideaId && idea.upvotes.includes(userInfo.email)
        );
      } else if (voteType === 'downvote') {
        return voted.some(
          (idea) =>
            idea.ideaId === post.ideaId &&
            idea.downvotes.includes(userInfo.email)
        );
      }
    }
    return true;
  }

  public formatVotes(votes: number): string {
    if (votes >= 1000 && votes < 1000000) {
      return (votes / 1000).toFixed(1) + 'K';
    } else {
      return votes.toString();
    }
  }

  public increaseCommentsNumber(ideaId: string): void {
    const ideas = this.getIdeas() || [];
    const matchedIdea = ideas.find((idea) => idea.ideaId === ideaId);

    if (matchedIdea) {
      matchedIdea.commentsNumber += 1;
      this.saveIdeas(ideas);
    }
  }

  public changeCommentNumber(
    changeType: 'increase' | 'decrease',
    ideaId: string,
    count: number = 1
  ): void {
    const ideas = this.getIdeas() || [];
    const matchedIdea = ideas.find((idea) => idea.ideaId === ideaId);

    if (matchedIdea) {
      if (changeType === 'increase') {
        matchedIdea.commentsNumber += count;
        this.saveIdeas(ideas);
      } else if (changeType === 'decrease') {
        matchedIdea.commentsNumber -= count;
        this.saveIdeas(ideas);
      }
    }
  }

  public deleteIdea(ideaId: string): void {
    const ideas = this.getIdeas() || [];
    const updatedIdeas = ideas.filter((idea) => idea.ideaId !== ideaId);
  
    const comments = this.localStorageService.getComments() || [];
    const updatedComments = comments.filter((comment) => comment.ideaId !== ideaId);
  
    this.saveIdeas(updatedIdeas);
    this.localStorageService.saveComments(updatedComments);
    }
}
