import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopWatchRoutingModule } from './stop-watch-routing.module';
import { IonicModule } from '@ionic/angular';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@NgModule({
  declarations: [StopwatchComponent],
  imports: [
    CommonModule,
    StopWatchRoutingModule,
    IonicModule,


  ],providers:[  ScreenOrientation]
})
export class StopWatchModule { }
