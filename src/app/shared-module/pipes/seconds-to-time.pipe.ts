import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
      const date = new Date(0);
      date.setSeconds(value);
      var timeString = date.toISOString().substring(11, 19);
      return timeString
  }

}
