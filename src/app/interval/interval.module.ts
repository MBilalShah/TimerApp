import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntervalRoutingModule } from './interval-routing.module';
import { IntervalComponent } from './interval/interval.component';
import { IonicModule } from '@ionic/angular';
import { IntervalFormComponent } from './interval-form/interval-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { IntervalTimerComponent } from './interval-timer/interval-timer.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { SharedModuleModule } from '../shared-module/shared-module.module';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { LoopPopupComponent } from './loop-popup/loop-popup.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    IntervalComponent,
    IntervalFormComponent, IntervalTimerComponent, OptionsMenuComponent, LoopPopupComponent, ConfigurationComponent
  ],
  imports: [
    CommonModule,
    IntervalRoutingModule,
    IonicModule,
    SharedModuleModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animation: false,
      responsive: true,
      renderOnClick: false
    }),
  ], providers: [
    ScreenOrientation,

  ]
})
export class IntervalModule { }
