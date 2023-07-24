import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AMRAPComponent } from './amrap/amrap.component';

const routes: Routes = [
  {
    path: '',
    component: AMRAPComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmrapRoutingModule { }
