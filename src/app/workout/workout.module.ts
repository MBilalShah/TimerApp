import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout/workout.component';
import { IonicModule } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    WorkoutComponent,
    WorkoutDetailComponent
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    IonicModule,
    SharedModuleModule,
    FormsModule
  ],
  providers: [ScreenOrientation]
})
export class WorkoutModule { }
