import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopWatchRoutingModule } from './stop-watch-routing.module';
import { IonicModule } from '@ionic/angular';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ConfigurationComponentComponent } from './configuration-component/configuration-component.component';

@NgModule({
  declarations: [StopwatchComponent, ConfigurationComponentComponent],
  imports: [
    CommonModule,
    StopWatchRoutingModule,
    IonicModule,


  ], providers: [ScreenOrientation]
})
export class StopWatchModule { }
