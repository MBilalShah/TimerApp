import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './components/settings/settings.component';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],providers:[UntypedFormBuilder]
})
export class SettingsModule { }
