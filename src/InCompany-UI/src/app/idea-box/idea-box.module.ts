import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { IdeaBoxRoutingModule } from './idea-box.routing';
import { CreateIdeaComponent } from './create-idea/create-idea.component';
import { DetailedPostComponent } from './detailed-post/detailed-post.component';
import { MyIdeasComponent } from './my-ideas/my-ideas.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentSectieComponent } from './comment-sectie/comment-sectie.component';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    MainComponent,
    CreateIdeaComponent,
    DetailedPostComponent,
    MyIdeasComponent,
    ListPostsComponent,
    CommentSectieComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    IdeaBoxRoutingModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class IdeaBoxModule { }
