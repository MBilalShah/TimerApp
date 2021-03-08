import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalTimerComponent } from './interval-timer/interval-timer.component';
import { IntervalComponent } from './interval/interval.component';

const routes: Routes = [
  {
    path:'',
    component:IntervalComponent
  },
  {
    path:'interval-timer/:index',
    component:IntervalTimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntervalRoutingModule { }
