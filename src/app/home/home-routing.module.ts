import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'clock',
    loadChildren: () => import('./../clock/clock.module').then(m => m.ClockModule),
  },
  {
    path: 'stopwatch',
    loadChildren: () => import('./../stop-watch/stop-watch.module').then(m => m.StopWatchModule),
  },
  {
    path: 'counter',
    loadChildren: () => import('./../counter/counter.module').then(m => m.CounterModule),
  },
  {
    path: 'interval',
    loadChildren: () => import('./../interval/interval.module').then(m => m.IntervalModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'workout',
    loadChildren: () => import('./../workout/workout.module').then(m => m.WorkoutModule),
  }
  // {
  //   path: '',
  //   component: HomePage,
  //   children:[
  //     {
  //       path:'',
  //       redirectTo:'clock',
  //       pathMatch:'full'
  //     },

  //     {
  //       path:'clock',
  //       loadChildren: () => import('./../clock/clock.module').then(m => m.ClockModule),
  //     },
  //     {
  //       path:'stopwatch',
  //       loadChildren: () => import('./../stop-watch/stop-watch.module').then(m => m.StopWatchModule),
  //     },
  //     {
  //       path:'counter',
  //       loadChildren: () => import('./../counter/counter.module').then(m => m.CounterModule),
  //     },
  //     {
  //       path:'interval',
  //       loadChildren: () => import('./../interval/interval.module').then(m => m.IntervalModule),
  //     },
  //     {
  //       path:'settings',
  //       loadChildren: () => import('./../settings/settings.module').then(m => m.SettingsModule),
  //     }
  //   ]
  // },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
