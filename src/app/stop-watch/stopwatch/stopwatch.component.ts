import { Component, OnInit,OnDestroy,ViewChild, ElementRef} from '@angular/core';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonContent, Platform } from '@ionic/angular';
import { SaveStateService, ScreenEnum } from 'src/app/shared-module/services/save-state.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {

  constructor(public stopWatchService:StopwatchServiceService,private orientation:ScreenOrientation,private saveStateService:SaveStateService,private platform:Platform) {
    this.platform.pause.subscribe(data=>
      this.saveState()
      )
   }
   subscription:Subscription
  is_landscape:boolean=false;
  laps:any[]=[]
  @ViewChild('content') content:IonContent;

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

    this.subscription=this.stopWatchService.timerListener.subscribe(timer=>{
      this.saveState()
    })
    this.onOrientationChange()
    this.orientation.onChange().subscribe(data=>{
      console.log('orientation changed',data,this.orientation.type)
  this.onOrientationChange()
    })

  }
  ionViewDidEnter(){
    this.getState()
    this.stopWatchService.initializeFiles()
  }
  saveState(){
    this.saveStateService.saveState(ScreenEnum.stopwatch,{
      laps:this.laps,
      timerVal:this.stopWatchService.timerVal
    })
  }

  async getState(){
    const data= await this.saveStateService.getState(ScreenEnum.stopwatch)
if(data){
    this.laps=data.laps
    this.stopWatchService.timerVal=data.timerVal
 } }

  scrolltobottom(){
    console.log(this.content)

    this.content?this.content.scrollToBottom():null;
  }

  startTimer(){
    this.stopWatchService.startTimer()
  }
  stopTimer(){
    this.stopWatchService.stopTimer()
  }
  lapTime(){
    if(this.stopWatchService.isStarted){
    const now= this.stopWatchService.getTime()
    this.laps.push(now)
    this.scrolltobottom()}
  }
  resume(){
    this.stopWatchService.resumeTimer()
  }
  reset(){

    this.stopWatchService.resetTimer()
    this.laps=[]
    this.saveState()
  }
  ionViewDidLeave(){
    // this.subscription.unsubscribe()
    this.saveState()
    this.stopWatchService.stopTimer()
    this.stopWatchService.resetTimer()
    this.laps=[]
    this.stopWatchService.unloadFiles()

  }
}
