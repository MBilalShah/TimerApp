import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Interval, IntervalForm, IntervalType } from 'src/app/shared-module/Models/Interval.Model';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html',
  styleUrls: ['./interval-timer.component.scss'],
})
export class IntervalTimerComponent implements OnInit {

  constructor(public stopwatchService:StopwatchServiceService,private acRoute:ActivatedRoute,private storage:Storage,private orientation:ScreenOrientation) { }

  percentage:number = 100;
  timer:number=0
  intervals:Interval[]=[]
  activeIndex:number=0
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
  async ngOnInit() {

    this.onOrientationChange()
    this.orientation.onChange().subscribe(data=>{
      console.log('orientation changed',data,this.orientation.type)
  this.onOrientationChange()
    })
    const ints= await this.storage.get('intervals')

    const index= this.acRoute.snapshot.params.index

    const int:IntervalForm= ints[index]

    console.log(int)

    for(let i= 0;i<int.rounds;i++){
      this.intervals.push({
        time: this.convertToSeconds(int.workoutTime),
        type: IntervalType.workout,
      });

      this.intervals.push({
        time: this.convertToSeconds(int.restTime),
        type: IntervalType.rest,
      });
    }

    console.log(this.intervals)


  }

  convertToSeconds(time:string){
    const [hours,minutes,seconds]=time.split(':')
    return (parseInt( minutes) * 60) + parseInt( seconds)
  }
  startTimer(){

    this.stopwatchService.startTimer()
   const subscription= this.stopwatchService.timerListener.subscribe(timer=>{
      const activeInterval:Interval=this.intervals[this.activeIndex]
      this.timer=timer

      if(this.timer==activeInterval.time){
        this.stopwatchService.resetTimer()
        this.activeIndex=this.activeIndex+1

      }

      if(this.activeIndex>this.intervals.length -1){
        this.stopTimer()
        this.reset()
        subscription.unsubscribe()
      }

    })
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
    this.activeIndex=0
  }

  ceiling(val){return Math.ceil(val)}

  ngOnDestroy(){
    this.stopwatchService.stopTimer()
    this.stopwatchService.resetTimer()
  }

}
