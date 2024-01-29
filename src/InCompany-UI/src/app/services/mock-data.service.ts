import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Idea } from '../models/idea.model';
import { CommentInfo } from '../idea-box/comment-class';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  mockDataMoodmeter = {
    moods: [
      {
        moodValue: 4,
        timestamp: "2024-01-08T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-09T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 1,
        timestamp: "2024-01-10T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-11T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 1,
        timestamp: "2024-01-12T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-13T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 5,
        timestamp: "2024-01-14T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-12T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: '2024-01-15T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 3,
        timestamp: '2024-01-16T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 2,
        timestamp: '2024-01-16T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 4,
        timestamp: "2024-01-17T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-18T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: '2024-01-19T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 3,
        timestamp: '2024-01-20T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 2,
        timestamp: '2024-01-21T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 4,
        timestamp: "2024-01-21T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: '2024-01-22T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 1,
        timestamp: "2024-01-23T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-24T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: '2024-01-25T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 3,
        timestamp: '2024-01-26T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 2,
        timestamp: '2024-01-27T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 4,
        timestamp: "2024-01-28T11:04:22.593Z",
        userId: "michel@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: '2024-01-29T11:04:22.593Z',
        userId: 'michel@gmail.com',
        userDepartment: 'appDevelopment',
      },
      {
        moodValue: 4,
        timestamp: "2024-01-08T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-09T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 1,
        timestamp: "2024-01-10T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-11T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 1,
        timestamp: "2024-01-12T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-13T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 5,
        timestamp: "2024-01-14T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-12T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-15T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-16T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-16T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-17T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-18T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-19T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-20T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-21T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-21T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-22T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 1,
        timestamp: "2024-01-23T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-24T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 4,
        timestamp: "2024-01-25T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-26T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-27T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 2,
        timestamp: "2024-01-28T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
      {
        moodValue: 3,
        timestamp: "2024-01-29T11:04:22.593Z",
        userId: "tom@gmail.com",
        userDepartment: "appDevelopment"
      },
    ],
    moodTimer: {
      userId: 'michel@gmail.com',
      timer: 0,
    },
  };

  mockDataIdeeënbox = {
    ideas: [
      {
        title: "De muren moeten groen geverfd worden.",
        description: "Groen wordt vaak geassocieerd met natuur en frisheid. Door een muur groen te schilderen, kan het de omgeving opvrolijken en een visueel aantrekkelijke en rustgevende sfeer creëren.",
        timestamp: "2023-12-16T09:40:25.788Z",
        ideaId: "1705398025788000000",
        userId: "tom@gmail.com",
        userName: "Tom Eelman",
        voteNumber: 132,
        commentsNumber: 4,
        upvotes: [],
        downvotes: [],
        userVotes: false,
        timeAgo: ""
      },
      {
        title: "De monitor in het kantoor met de groene muur knippert",
        description: "Als ik aan het werk ben is dit heel vervelend.",
        timestamp: "2023-12-07T10:30:40.123Z",
        ideaId: "1705398025788000001",
        userId: "jip@gmail.com",
        userName: "Jip Verhoeven",
        voteNumber: 85,
        commentsNumber: 0,
        upvotes: [],
        downvotes: [],
        userVotes: true,
        timeAgo: ""
      },
      {
        title: "De koffiemachine doet het niet",
        description: "Het scherm van de koffiezetmachine doet het niet.",
        timestamp: "2023-02-07T10:30:40.123Z",
        ideaId: "1705398025788000002",
        userId: "michel@gmail.com",
        userName: "Michel Ruiter",
        voteNumber: -31,
        commentsNumber: 0,
        upvotes: [],
        downvotes: [],
        userVotes: true,
        timeAgo: ""
      },
    ]
  };

  mockDataComments: CommentInfo[] = [
    {
      comment: 'Ja wat een super idee !!!!!!!!!!!!',
      timestamp: new Date('2024-01-16T10:36:59.047Z'),
      commentId: '1705401419047000000',
      ideaId: '1705398025788000000',
      userId: 'jip@gmail.com',
      userName: 'Jip Verhoeven',
      voteNumber: 0,
      upvotes: [],
      downvotes: [],
      parentCommentId: null,
      showReplyInput: false
    },
    {
      comment: 'Dit vond ik ook een goed idee brengt wat sfeer met zich mee!',
      timestamp: new Date('2024-01-16T10:37:48.105Z'),
      commentId: '1705401468105000000',
      ideaId: '1705398025788000000',
      userId: 'roger@gmail.com',
      userName: 'Roger Engel',
      voteNumber: 0,
      upvotes: [],
      downvotes: [],
      parentCommentId: '1705401419047000000',
      showReplyInput: false
    },
    {
      comment: 'Ik vind blauw een betere kleur voor de muur.',
      timestamp: new Date('2024-01-16T10:38:23.471Z'),
      commentId: '1705401503471000000',
      ideaId: '1705398025788000000',
      userId: 'michel@gmail.com',
      userName: 'Michel Ruiter',
      voteNumber: 0,
      upvotes: [],
      downvotes: [],
      parentCommentId: null,
      showReplyInput: false
    },
    {
      comment: 'Dit vind ik ook.',
      timestamp: new Date('2024-01-16T10:38:57.935Z'),
      commentId: '1705401537935000000',
      ideaId: '1705398025788000000',
      userId: 'ryan@gmail.com',
      userName: 'Ryan de Graaf',
      voteNumber: 0,
      upvotes: [],
      downvotes: [],
      parentCommentId: '1705401503471000000',
      showReplyInput: false
    }
  ];

  constructor(private localStorageService: LocalstorageService) { }

  public fillMockData() {
    this.fillMoodData();
    this.fillIdeaData();
  }

  private fillMoodData() {
    this.localStorageService.saveMood(this.mockDataMoodmeter);
  }

  private fillIdeaData() {
    const ideas = this.localStorageService.getIdeas() || [];
    const ideasArray: Idea[] = ideas;
    const ideasLength = ideasArray.length;
  
    if (ideasLength < 1) {
      this.mockDataIdeeënbox.ideas.forEach((idea: Idea) => {
        this.localStorageService.saveIdea(idea);
      });
      this.localStorageService.saveComments(this.mockDataComments);
    }
  }
  
}