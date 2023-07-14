import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutComponent
  },
  {
    path: 'workout-detail',
    component: WorkoutDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
