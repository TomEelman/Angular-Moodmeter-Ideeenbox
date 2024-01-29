import { Injectable } from '@angular/core';
import { CommentInfo } from '../idea-box/comment-class';
import { Subject } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsSubject = new Subject<CommentInfo[]>();
  public comments$ = this.commentsSubject.asObservable();

  private saveCommentSubject = new Subject<CommentInfo[]>();
  public saveComment$ = this.saveCommentSubject.asObservable();

  constructor(private localStorageService: LocalstorageService) {}

  private convertToCommentInfo(arr: any[]): CommentInfo[] {
    const tempArr: CommentInfo[] = [];
    arr.forEach((commentObj: any) => {
      tempArr.push(new CommentInfo(commentObj));
    });
    return tempArr;
  }

  public saveComment(comment: CommentInfo): void {
    const commentArr = this.localStorageService.getComments();
    commentArr.push(comment);

    const filteredComments = commentArr.filter(
      (commentObj: any) => commentObj.ideaId === comment.ideaId
    );

    const tempArr = this.convertToCommentInfo(filteredComments);
    this.localStorageService.saveComment(comment);
    this.saveCommentSubject.next(tempArr);
  }

  public getCommentsById(id: string): CommentInfo[] {
    const commentArr = this.localStorageService.getComments();
    const tempArr: CommentInfo[] = [];
    const filteredComments = commentArr.filter(
      (comment: any) => comment.ideaId === id
    );
    filteredComments.forEach((commentObj: any) => {
      tempArr.push(new CommentInfo(commentObj));
    });
    return tempArr;
  }

  public deleteComment(commentType: 'mainComment' | 'subComment', commentId: string): number {
    const commentArr = this.localStorageService.getComments();
    let commentsToDelete: number = 0;
    let filteredComments: any[] = [];
  
    if (commentType === 'mainComment') {
      commentsToDelete = commentArr.reduce((count, comment) => {
        if (comment.commentId === commentId || comment.parentCommentId === commentId) {
          return count + 1;
        }
        return count;
      }, 0);
  
      filteredComments = commentArr.filter(
        (comment: any) => comment.commentId !== commentId && comment.parentCommentId !== commentId
      );
  
      this.localStorageService.saveComments(filteredComments);
    } else if (commentType === 'subComment') {
      commentsToDelete = 1;
  
      filteredComments = commentArr.filter(
        (comment: any) => comment.commentId !== commentId
      );
  
      this.localStorageService.saveComments(filteredComments);
    }
  
    this.saveCommentSubject.next(this.convertToCommentInfo(filteredComments));
    return commentsToDelete;
  }
}
