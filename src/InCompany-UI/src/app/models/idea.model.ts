export class Idea {
    public title!: string;
    public description!: string;
    public timestamp!: string;
    public ideaId!: string;
    public userId!: string;
    public userName!: string;
    public voteNumber!: number;
    public commentsNumber!: number;
    public upvotes!: string[];
    public downvotes!: string[];
    public userVotes?: boolean;
    public timeAgo?: string;


    constructor(obj: any) {
        this.title = obj.title;
        this.description = obj.description;
        this.timestamp = obj.timestamp;
        this.ideaId = obj.ideaId;
        this.userId = obj.userId;
        this.userName = obj.userName;
        this.voteNumber = obj.voteNumber;
        this.commentsNumber = obj.commentsNumber;
        this.upvotes = obj.upvotes || [];
        this.downvotes = obj.downvotes || [];
        this.userVotes = obj.userVotes || false;
        this.timeAgo = obj.timeAgo || '';
    }
}
