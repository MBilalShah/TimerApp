import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AmrapRoutingModule } from './amrap-routing.module';
import { ConfigAmrapComponent } from './config-amrap/config-amrap.component';
import { AMRAPComponent } from './amrap/amrap.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@NgModule({
  declarations: [
    ConfigAmrapComponent,
    AMRAPComponent
  ],
  imports: [
    CommonModule,
    AmrapRoutingModule,
    IonicModule
  ],
  providers: [ScreenOrientation]
})
export class AmrapModule { }
