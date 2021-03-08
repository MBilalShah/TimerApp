import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  constructor(public stopwatchService:StopwatchServiceService,private orientation:ScreenOrientation) { }

  timer:number=0;


  type:CounterTypeEnum=CounterTypeEnum.countdown
  hour:string='00'
  minutes:string='00'
  seconds:string='00'

  percentage:number=0;

  subscription:Subscription

  is_landscape:boolean=false;
  onOrientationChange(){
    if(this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE_PRIMARY
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE_SECONDARY
      ){
        this.is_landscape=true
      }else if(
        this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT
        ||
        this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_PRIMARY
        ||
        this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_SECONDARY
      ){
this.is_landscape = false;
      }
  }

  ngOnInit() {
    this.onOrientationChange()
    this.orientation.onChange().subscribe(data=>{
      console.log('orientation changed',data,this.orientation.type)
  this.onOrientationChange()
    })
  }

  startTimer(){
    // this.onTimeChange(null)

    const limit=this.timer
    this.stopwatchService.startTimer()
    this.subscription=this.stopwatchService.timerListener.subscribe(timer=>{
      if(timer){

        if(this.type===CounterTypeEnum.countup){
          this.timer=timer

          this.percentage= (this.timer/limit) * 100
          if(this.timer==limit){
            this.stopwatchService.stopTimer();
            this.stopwatchService.resetTimer();
            this.subscription.unsubscribe()
          }
        }else if(this.type===CounterTypeEnum.countdown){
          this.timer=limit-timer

          this.percentage= 100 - ((this.timer/limit) * 100 )
          if(this.timer==0){
            this.stopwatchService.stopTimer();
            this.stopwatchService.resetTimer();
            this.subscription.unsubscribe()
          }
        }



      }
    })

  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.stopwatchService.stopTimer()
    this.stopwatchService.resetTimer()
  }

  onTimeChange(event){
    console.log(event)
    const times=event.target.value.split(':')
    this.minutes=times[1]
    this.seconds=times[2]
    console.log(this.minutes,this.seconds)
    const timeInSeconds= (parseInt(this.minutes)*60) + parseInt(this.seconds)
    console.log(timeInSeconds)

 this.timer=timeInSeconds

  }

  stopTimer(){
    this.stopwatchService.stopTimer()
  }

  resume(){
    this.stopwatchService.resumeTimer()
  }

  reset(){
    this.stopwatchService.resetTimer()
    this.timer=0
  }


}


enum CounterTypeEnum{
  countdown,
  countup
}
