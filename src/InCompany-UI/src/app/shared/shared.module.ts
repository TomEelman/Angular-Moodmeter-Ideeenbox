import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './footer/settings/settings.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    SettingsComponent,
    DropDownComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    DropDownComponent,
    SettingsComponent,
    ListItemComponent,
  ]
})
export class SharedModule { }
