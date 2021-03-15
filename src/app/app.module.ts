import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Media } from '@ionic-native/media/ngx';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './shared-module/components/loading-screen/loading-screen.component';
@NgModule({
  declarations: [AppComponent,LoadingScreenComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,    IonicStorageModule.forRoot({
    name: '__mydb',
driverOrder: ['indexeddb', 'sqlite', 'websql']
  }),CommonModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NativeAudio,Media],
  bootstrap: [AppComponent],
})
export class AppModule {}
