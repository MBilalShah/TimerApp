import { Component, OnInit } from '@angular/core';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {

  constructor(public stopWatchService:StopwatchServiceService,private orientation:ScreenOrientation) { }

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
  laps:any[]=[]
  startTimer(){
    this.stopWatchService.startTimer()
  }
  stopTimer(){
    this.stopWatchService.stopTimer()
  }
  lapTime(){
    const now= this.stopWatchService.getTime()
    this.laps.push(now)
  }
  resume(){
    this.stopWatchService.resumeTimer()
  }
  reset(){
    this.stopWatchService.resetTimer()
    this.laps=[]
  }
  ngOnDestroy(){
    this.stopWatchService.stopTimer()
    this.stopWatchService.resetTimer()
  }
}
