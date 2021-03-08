import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClockRoutingModule } from './clock-routing.module';
import { IonicModule } from '@ionic/angular';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [
    ClockComponent
  ],
  imports: [
    CommonModule,
    ClockRoutingModule,
    IonicModule
  ]
})
export class ClockModule { }
