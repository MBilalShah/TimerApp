import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeshow'
})
export class TimeshowPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const splits= value.split(':')
    return `${splits[1]}:${splits[2]}`;
  }

}
