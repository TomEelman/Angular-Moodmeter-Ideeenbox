import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Mood } from '../models/mood.model';
import { Idea } from '../models/idea.model';
import { CommentInfo } from '../idea-box/comment-class';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {
    this.clearUserOnWindowClose();
  }

  public saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? new User(JSON.parse(userString)) : null;
  }

  public clearUserOnWindowClose(): void {
    let session = sessionStorage.getItem('register');
    if (session == null) {
      localStorage.removeItem('user');
    }
    sessionStorage.setItem('register', '1');
  }

  public clearUserOnClick(): void {
    localStorage.removeItem('user');
  }

  public saveMood(mood: Mood): void {
    localStorage.setItem('mood', JSON.stringify(mood));
  }

  public getMood(): Mood | null {
    const moodString = localStorage.getItem('mood');
    return moodString ? new Mood(JSON.parse(moodString)) : null;
  }

  public saveIdea(idea: Idea): void {
    let ideas: Idea[] = this.getIdeas() || [];
    ideas.push(idea);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  public getIdeas(): Idea[] | null {
    const ideaString = localStorage.getItem('ideas');
    return ideaString ? JSON.parse(ideaString) : null;
  }

  public getComments(): any[] {
    const commentString = localStorage.getItem('comments');
    const commentArr = commentString ? JSON.parse(commentString) : [];
    return commentArr;
  }

  public saveComment(comment: CommentInfo): void {
    const commentArr = this.getComments();
    commentArr.push(comment);
    localStorage.setItem('comments', JSON.stringify(commentArr));
  }

  public saveComments(comments: any[]): void {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
}