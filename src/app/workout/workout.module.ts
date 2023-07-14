import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout/workout.component';
import { IonicModule } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
@NgModule({
  declarations: [
    WorkoutComponent,
    WorkoutDetailComponent
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    IonicModule
  ],
  providers: [ScreenOrientation]
})
export class WorkoutModule { }
