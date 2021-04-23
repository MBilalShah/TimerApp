import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SaveStateService, ScreenEnum } from 'src/app/shared-module/services/save-state.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  constructor(public stopwatchService:StopwatchServiceService,private orientation:ScreenOrientation,private saveStateService:SaveStateService,private platform:Platform) {

    this.platform.pause.subscribe(data=>this.saveState())
   }
   playSound(){
    this.stopwatchService.playSound('bell')
   }
  timer:number=0;



  type:CounterTypeEnum=CounterTypeEnum.countdown
  hour:string='00'
  minutes:string='00'
  seconds:string='00'

  percentage:number=0;

  subscription:Subscription

  is_landscape:boolean=false;

  ionViewDidEnter(){
    this.getState()
    this.stopwatchService.initializeFiles()
  }


  saveState(){

      this.saveStateService.saveState(ScreenEnum.counter,{
        timer:this.timer,
        type:this.type,
        hour:this.hour,
        minutes:this.minutes,
        seconds:this.seconds,
        percentage:this.percentage,
      })

  }

  async getState(){
   const data= await this.saveStateService.getState(ScreenEnum.counter)
   if(data){
     this.timer=data.timer
     if(this.timer){
     this.stopwatchService.timerVal=-1}
   this.type=data.type;
   this.hour=data.hour;
   this.minutes=data.minutes;
   this.seconds=data.seconds;
   this.percentage=data.percentage;
  this.listenToTimer(this.timer)
  }}


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

  listenToTimer(limit:number){
    this.subscription? this.subscription.unsubscribe():null;
    this.subscription=this.stopwatchService.timerListener.subscribe(timer=>{
      if(timer){

        if(this.type===CounterTypeEnum.countup){
          this.timer=timer

          this.percentage= (this.timer/limit) * 100
          if(this.timer==limit){
            this.percentage=0
            this.playSound()
            this.stopwatchService.stopTimer();
            this.stopwatchService.resetTimer();
            this.subscription.unsubscribe();
            this.timer=this.convertToSeconds()
          }
        }else if(this.type===CounterTypeEnum.countdown){
          this.timer=limit-timer

          this.percentage= 100 - ((this.timer/limit) * 100 )
          if(this.timer==0){
            this.percentage=0
            this.playSound()
            this.stopwatchService.stopTimer();
            this.stopwatchService.resetTimer();
            this.subscription.unsubscribe();
            this.timer=this.convertToSeconds()
          }
        }


        // this.saveState()
      }
    })
  }
  startTimer(){
    // this.onTimeChange(null)


    !this.timer?this.timer=3540:null

    const limit=this.timer
    this.stopwatchService.startTimer()

    this.listenToTimer(limit)

  }

  ionViewDidLeave(){
    this.saveState()
    this.subscription?this.subscription.unsubscribe():null
    this.stopwatchService.stopTimer()
    this.stopwatchService.resetTimer()
    this.stopwatchService.unloadFiles()
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

  convertToSeconds(){
    return (parseInt(this.minutes)*60) + parseInt(this.seconds)
  }
  // resetTimer(event){
  //   event.el.value='00:00:00'
  // }

  stopTimer(){
    this.stopwatchService.stopTimer()
  }

  resume(){
    this.stopwatchService.resumeTimer()
  }

  reset(){
    this.stopwatchService.resetTimer()
    this.timer=this.convertToSeconds()
    this.percentage=0;
    this.saveState()
  }

  hardReset(){
    this.reset()
    this.timer=0;
    this.saveState()
    this.minutes='00'
    this.seconds='00'
  }


}


enum CounterTypeEnum{
  countdown,
  countup
}
