import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MyIdeasComponent } from './my-ideas/my-ideas.component';
import { DetailedPostComponent } from './detailed-post/detailed-post.component';
import { CreateIdeaComponent } from './create-idea/create-idea.component';
import { CommentSectieComponent } from './comment-sectie/comment-sectie.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'my-ideas', component: MyIdeasComponent },
  { path: 'detail-post/:ideaId', component: DetailedPostComponent },
  { path: 'create-idea', component: CreateIdeaComponent },
  { path: 'comment', component: CommentSectieComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeaBoxRoutingModule {}
