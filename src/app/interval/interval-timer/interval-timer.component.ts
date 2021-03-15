import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Interval, IntervalForm, IntervalType } from 'src/app/shared-module/Models/Interval.Model';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';

@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html',
  styleUrls: ['./interval-timer.component.scss'],
})
export class IntervalTimerComponent implements OnInit {

  constructor(public stopwatchService:StopwatchServiceService,private acRoute:ActivatedRoute,private storage:Storage,private orientation:ScreenOrientation,private saveStateService:SaveStateService) {

  }

  subscription:Subscription
  percentage:number = 100;
  timer:number=0
  intervals:Interval[]=[]
  activeIndex:number=0
  is_landscape:boolean=false;
  int:IntervalForm;
  color:string='#FB331A'
  // saveState(){
  //   this.saveState
  // }

  ionViewDidEnter(){
    this.getState()
  }

  saveState(){
    this.saveStateService.saveState(this.int.id,{
      percentage:this.percentage,
      timer:this.timer,
      activeIndex:this.activeIndex,
      color:this.color
    })
  }

  async getState(){
    const index= this.acRoute.snapshot.params.index
    const data = await this.saveStateService.getState(index)
    if(data){
    this.percentage=data.percentage;
    this.timer=data.timer
    this.activeIndex=data.activeIndex
    this.color=data.color
    this.stopwatchService.timerVal=this.timer
    this.subscription= this.stopwatchService.timerListener.subscribe(timer=>{
      this.timerListener(timer)
       })
  }
}

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
  async ngOnInit() {

    this.onOrientationChange()
    this.orientation.onChange().subscribe(data=>{
      console.log('orientation changed',data,this.orientation.type)
  this.onOrientationChange()
    })
    const ints= await this.storage.get('intervals') as IntervalForm[]

    const index= this.acRoute.snapshot.params.index

    this.int= ints.find(int=>int.id===index)

    console.log(this.int)

    for(let i= 0;i<this.int.rounds;i++){
      this.intervals.push({
        time: this.convertToSeconds(this.int.workoutTime),
        type: IntervalType.workout,
      });

      this.intervals.push({
        time: this.convertToSeconds(this.int.restTime),
        type: IntervalType.rest,
      });
    }

    console.log(this.intervals)


  }

     playSound(){
       this.stopwatchService.playSound('bell')
   }
  convertToSeconds(time:string){
    const [hours,minutes,seconds]=time.split(':')
    return (parseInt( minutes) * 60) + parseInt( seconds)
  }
  // isRest:boolean=false;

  timerListener(timer){
    const activeInterval:Interval=this.intervals[this.activeIndex]
    this.timer=timer - 1

    if(this.timer>=activeInterval.time){
      this.delayOneSecond(()=>{
        this.activeIndex=this.activeIndex+1
        if(this.activeIndex>this.intervals.length -1){
          this.stopTimer()
          this.reset()
          this.subscription.unsubscribe()
          return;
        }

        this.intervals[this.activeIndex].type==0? this.color= '#FB331A': this.color='#2D92F8'

      })
      this.playSound()
      this.stopwatchService.resetTimer()

    }

    // if(this.activeIndex>this.intervals.length -1){
    //   this.stopTimer()
    //   this.reset()
    //   this.subscription.unsubscribe()
    // }
    this.saveState()
  }

  startTimer(){


    this.stopwatchService.startTimer()

    this.subscription? this.subscription.unsubscribe():null;

   this.subscription= this.stopwatchService.timerListener.subscribe(timer=>{
   this.timerListener(timer)
    })
  }

  delayOneSecond(callback){
    setTimeout(() => {
      callback()
    }, 1000);
  }
  stopTimer(){
    this.stopwatchService.stopTimer()
    // this.subscription? this.subscription.unsubscribe():null;
  }

  resume(){
    // this.stopwatchService.startTimer()
    this.stopwatchService.resumeTimer()
  }

  reset(){
    this.color= '#FB331A'
    this.stopwatchService.resetTimer()
    this.timer=0
    this.activeIndex=0
  }

  ceiling(val){return Math.ceil(val)}

  ionViewDidLeave(){
    this.subscription?this.subscription.unsubscribe():null
    this.stopwatchService.stopTimer()
    this.stopwatchService.resetTimer()
    this.saveState()
  }

}
