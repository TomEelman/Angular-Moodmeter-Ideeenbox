import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './choice-component/choice-component.component';
import { LogInComponent } from './log-in/log-in.component';
import { SettingsComponent } from './shared/footer/settings/settings.component';
import { SelectDepartmentComponent } from './select-department/select-department.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'ideabox',
    loadChildren: () => import('./idea-box/idea-box.module').then(m => m.IdeaBoxModule), canActivate: [AuthGuard]
  },
  {
    path: 'moodmeter',
    loadChildren: () => import('./mood-meter/mood-meter.module').then(m => m.MoodMeterModule), canActivate: [AuthGuard]
  },
  {
    path: 'choice',
    component: ChoiceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'department',
    component: SelectDepartmentComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }