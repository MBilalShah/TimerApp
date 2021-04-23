
import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { LoadingScreenComponent } from '../components/loading-screen/loading-screen.component';
import { NgxHowlerService } from 'ngx-howler';
@Injectable({
  providedIn: 'root'
})
export class StopwatchServiceService {

  beep:MediaObject;
  bell:MediaObject;
  start_date:Date;
  constructor(private loadingContoller:LoadingController,private nativeAudio:NativeAudio,private media:Media,private modalController:ModalController,
    private platform:Platform,private howler:NgxHowlerService) {


      this.howler.loadScript('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js');

      this.platform.pause.subscribe(()=>{
        this.onAppPause()
      })

      this.platform.resume.subscribe(()=>{
        this.onAppResume()
      })

    console.log('hi')
    this.initializeFiles()

  }


  initializeFiles(){
    // this.beep= this.media.create('assets/sounds/beep.mp3')
    // this.bell=this.media.create('assets/sounds/bell-sound.mp3')
    // this.setFile(this.beep)
    // this.setFile(this.bell)
    this.nativeAudio.preloadSimple('beep', 'assets/sounds/beep.mp3').then((success)=>{
      console.log("success");
    },(error)=>{
      console.log(error);
    });

    this.nativeAudio.preloadSimple('bell', 'assets/sounds/bell-sound.mp3').then((success)=>{
      console.log("success");
    },(error)=>{
      console.log(error);
    });

    // this.howler.register('bell',{
    //   src:'assets/sounds/bell-sound.mp3',
    //   html5:true,

    // }).subscribe(status=>console.log('bell status',status))
    // this.howler.register('beep',{
    //   src:'assets/sounds/beep.mp3'
    // }).subscribe(status=>console.log('bell status',status))
  }

  unloadFiles(){
    this.nativeAudio.unload('bell')
    this.nativeAudio.unload('beep')
  }
  setFile(file:MediaObject){



    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

file.onSuccess.subscribe(() => {console.log('Action is successful')
this.beep.setVolume(1)
this.bell.setVolume(1)});

file.onError.subscribe((error) => console.log('Error!', error));


  }
  playSound(sound:'beep'|'bell'){
    // this[sound].play()



    this.nativeAudio.play(sound, () => console.log('uniqueId1 is done playing'));

    // const player=this.howler.get(sound)
    // player.play()


//     if(sound==='beep'){
//       var mySound = new Audio();
// var mySound = new Audio('assets/sounds/beep.mp3'); mySound.play();
//     }else{
//       var mySound = new Audio();
// var mySound = new Audio('assets/sounds/bell-sound.mp3'); mySound.play();
//     }

   }

  timerVal:number=0;
  interval;

  public get isStarted(){
    return this.interval
  }

  public get isStopped(){
    return !this.interval && this.timerVal;
  }

  public get isResetted(){
    return !this.interval && !this.timerVal
  }

  timerListener:Subject<number>=new Subject()


  async bufferTimer(callback){

    const modal = await this.modalController.create({
      component: LoadingScreenComponent,
      cssClass: 'my-custom-class',

    });

    await modal.present();

    await modal.onWillDismiss()

    callback()

    // const loading=await this.loadingContoller.create({
    //   cssClass: 'my-custom-class',
    //   message: `Starting in ${buffer} seconds`,
    //   duration: 10000
    // })

    // loading.present()



  }


  startTimer(needsBuffer:boolean=true){
    if (needsBuffer) {
      this.bufferTimer(() => {
        this.interval = setInterval(() => {
          this.timerVal = this.timerVal + 1;
          this.timerListener.next(this.timerVal);
        }, 1000);
      });
    } else {
      this.interval = setInterval(() => {
        this.timerVal = this.timerVal + 1;
        this.timerListener.next(this.timerVal);
      }, 1000);
    }

    // this.interval=setInterval(()=>{
    //   this.timerVal=this.timerVal+1
    //   this.timerListener.next(this.timerVal)
    // },1000)
  }

  stopTimer(){
    clearInterval(this.interval)
    this.interval=null
  }

  resetTimer(){
    this.timerVal=0
  }

  resumeTimer(){
    this.startTimer(false)
  }
  getTime(){
    return this.timerVal
  }

  resumeDate:Date;
  _resumeTimer:number=0
  onAppPause(){
    this.resumeDate=new Date()
    this._resumeTimer=this.timerVal
    // this.stopTimer()
  }

  onAppResume(){
    if(this.resumeDate){
      const now= new Date()
      const buffer=Math.ceil(((now as any)-(this.resumeDate as any))/1000)
      this.timerVal=this._resumeTimer +  buffer
      this.timerListener.next(this.timerVal);
      // this.resumeDate=null;
      // this.resumeTimer()
    }
  }
}
