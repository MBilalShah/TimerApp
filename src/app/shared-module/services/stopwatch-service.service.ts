import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopwatchServiceService {

  constructor() { }

  timerVal:number=0;
  interval;

  public get isStarted(){
    return this.interval && this.timerVal
  }

  public get isStopped(){
    return !this.interval && this.timerVal
  }

  public get isResetted(){
    return !this.interval && !this.timerVal
  }

  timerListener:Subject<number>=new Subject()



  startTimer(){
    this.interval=setInterval(()=>{
      this.timerVal=this.timerVal+1
      this.timerListener.next(this.timerVal)
    },1000)
  }

  stopTimer(){
    clearInterval(this.interval)
    this.interval=null
  }

  resetTimer(){
    this.timerVal=0
  }

  resumeTimer(){
    this.startTimer()
  }
  getTime(){
    return this.timerVal
  }
}
