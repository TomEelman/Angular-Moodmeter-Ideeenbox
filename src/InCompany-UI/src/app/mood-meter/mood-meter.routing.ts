import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateMoodComponent } from './create-mood/create-mood.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'set-mood', component: CreateMoodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoodMeterRoutingModule { }