import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { CommentInfo } from '../comment-class';
import { LocalstorageService } from '../../services/localstorage.service';
import { iconObject } from '../../shared/icon-types';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IdeaService } from '../../services/idea.service';

export type User = {
  email: string;
  username: string;
};

@Component({
  selector: 'app-comment-sectie',
  templateUrl: './comment-sectie.component.html',
  styleUrls: ['./comment-sectie.component.scss'],
  providers: [DatePipe],
})
export class CommentSectieComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public activeSubCommentId?: string;

  public comment: string = '';
  public comments: CommentInfo[] = [];

  public iconTrash = iconObject.iconTrash;
  public iconPaperPlane = iconObject.iconPaperPlane;
  public iconUser = iconObject.iconUser;
  public iconFaceSmile = iconObject.iconFaceSmile;
  public iconArrowUp = iconObject.iconArrowUp;
  public iconArrowDown = iconObject.iconArrowDown;
  public iconCommentDots = iconObject.iconCommentDots;
  private ideaId!: string;

  public user: any;

  @ViewChild('commentTextarea') commentTextarea!: ElementRef;

  constructor(
    private commentService: CommentService,
    private localStorageService: LocalstorageService,
    private activatedRoute: ActivatedRoute,
    private ideasService: IdeaService
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => (this.ideaId = params['ideaId']));

    this.commentService.saveComment$
      .pipe(takeUntil(this.destroy$))
      .subscribe((comments: CommentInfo[]) => (this.comments = comments));
  }

  ngOnInit(): void {
    this.getCommentData();
    this.user = this.getUserInfo();
  }

  private getCommentData(): void {
    this.comments = this.commentService.getCommentsById(this.ideaId);
    this.updateTimeAgo();
  }

  public updateTimeAgo(): void {
    this.comments.forEach((comment: any) => {
      const commentDate = new Date(comment.timestamp);
      comment.timeAgo = this.getTimeAgo(commentDate);
    });
  }

  public getTimeAgo(timestamp: Date): string {
    return this.ideasService.getTimeAgo(timestamp);
  }

  public onCommentInput(commentId?: string) {
    this.adjustTextareaHeight(commentId);
  }

  private adjustTextareaHeight(commentId?: string): void {
    const textarea = commentId
      ? (document.getElementById(
          'TextArea_' + commentId
        ) as HTMLTextAreaElement)
      : this.commentTextarea.nativeElement;

    textarea.style.height = '2rem';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  private getUserInfo(): User {
    const user = this.localStorageService.getUser();
    return user
      ? { email: user.email, username: user.username }
      : { email: '', username: '' };
  }

  private createCommentId(): string {
    const timestampInNanoseconds = new Date().getTime() * 1e6;
    return timestampInNanoseconds.toString();
  }

  public saveComment(parentCommentId?: string) {
    const textarea = parentCommentId
      ? (document.getElementById(
          'TextArea_' + parentCommentId
        ) as HTMLTextAreaElement)
      : this.commentTextarea.nativeElement;

    const commentContent = textarea.value.trim();

    if (commentContent !== '') {
      const commentId = this.createCommentId();
      const userInfo = this.getUserInfo();
      const timestamp = new Date();

      const comment = new CommentInfo({
        ideaId: this.ideaId,
        comment: commentContent,
        timestamp: timestamp,
        userId: userInfo.email,
        userName: userInfo.username,
        voteNumber: 0,
        commentId: commentId,
        upvotes: [],
        downvotes: [],
        parentCommentId: parentCommentId,
        showReplyInput: false,
      });

      this.commentService.saveComment(comment);
      this.ideasService.changeCommentNumber('increase', this.ideaId);
      this.updateTimeAgo();
      textarea.value = '';
      this.adjustTextareaHeight();
      this.keepReplySectie(parentCommentId);
    }
  }

  private keepReplySectie(parentCommentId?: string) {
    if (parentCommentId) {
      const comment = this.comments.find(
        (c) => c.commentId === parentCommentId
      );
      if (comment) {
        comment.showReplyInput = true;
        this.activeSubCommentId = parentCommentId;
      }
    }
  }

  public toggleReply(commentId: string): void {
    const comment = this.comments.find((c) => c.commentId === commentId);

    if (comment) {
      if (this.activeSubCommentId === commentId) {
        comment.showReplyInput = false;
        this.activeSubCommentId = undefined;
      } else {
        this.comments.forEach((c) => {
          c.showReplyInput = false;
        });

        comment.showReplyInput = true;
        this.activeSubCommentId = commentId;
      }
    }
  }

  public deleteComment(
    commentType: 'mainComment' | 'subComment',
    commentId: string,
    parentCommentId?: string
  ): void {
    const commentsToDelete = this.commentService.deleteComment(
      commentType,
      commentId
    );

    if (commentsToDelete > 0) {
      this.ideasService.changeCommentNumber(
        'decrease',
        this.ideaId,
        commentsToDelete
      );
    }

    this.getCommentData();
    this.keepReplySectie(parentCommentId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
