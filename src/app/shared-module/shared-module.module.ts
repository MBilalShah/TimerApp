import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TimeshowPipe } from './pipes/timeshow.pipe';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';



@NgModule({
  declarations: [TimeshowPipe, NumbersOnlyDirective],
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animation: false,
      responsive: true,
      renderOnClick: false
    }),
  ],
  exports:[TimeshowPipe,NumbersOnlyDirective]
})
export class SharedModuleModule { }
