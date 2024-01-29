export class CommentInfo {
  public ideaId?: string;
  public comment!: string;
  public timestamp!: Date;
  public commentId!: string;
  public userId!: string;
  public userName!: string;
  public voteNumber!: number;
  public upvotes!: string[];
  public downvotes!: string[];
  public timeAgo?: string;
  public parentCommentId!: string | null;
  public showReplyInput?: boolean;

  constructor(obj: any) {
    this.ideaId = obj.ideaId;
    this.comment = obj.comment;
    this.timestamp = obj.timestamp;
    this.commentId = obj.commentId;
    this.userId = obj.userId;
    this.userName = obj.userName;
    this.voteNumber = obj.voteNumber;
    this.upvotes = obj.upvotes || [];
    this.downvotes = obj.downvotes || [];
    this.timeAgo = obj.timeAgo;
    this.parentCommentId = obj.parentCommentId ?? null;
    this.showReplyInput = obj.showReplyInput;
  }
}
