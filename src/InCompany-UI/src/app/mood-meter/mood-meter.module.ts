import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MoodMeterRoutingModule } from './mood-meter.routing';
import { OverviewComponent } from './overview/overview.component';
import { CreateMoodComponent } from './create-mood/create-mood.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    CreateMoodComponent,
  ],
  imports: [
    CommonModule,
    MoodMeterRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class MoodMeterModule { }
