
import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { LoadingScreenComponent } from '../components/loading-screen/loading-screen.component';
@Injectable({
  providedIn: 'root'
})
export class StopwatchServiceService {

  beep:MediaObject;
  bell:MediaObject;

  constructor(private loadingContoller:LoadingController,private nativeAudio:NativeAudio,private media:Media,private modalController:ModalController) {


    console.log('hi')
    this.initializeFiles()
  }

  initializeFiles(){
    this.beep= this.media.create('assets/sounds/beep.mp3')
    this.bell=this.media.create('assets/sounds/bell-sound.mp3')
    this.setFile(this.beep)
    this.setFile(this.bell)
  }
  setFile(file:MediaObject){



    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

file.onSuccess.subscribe(() => {console.log('Action is successful')
this.beep.setVolume(1)
this.bell.setVolume(1)});

file.onError.subscribe((error) => console.log('Error!', error));


  }
  playSound(sound:'beep'|'bell'){
    this[sound].play()
    // this.nativeAudio.play(sound, () => console.log('uniqueId1 is done playing'));
   }

  timerVal:number=0;
  interval;

  public get isStarted(){
    return this.interval
  }

  public get isStopped(){
    return !this.interval && this.timerVal
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
    if(needsBuffer){
      this.bufferTimer(()=>{
            this.interval=setInterval(()=>{
      this.timerVal=this.timerVal+1
      this.timerListener.next(this.timerVal)
    },1000)
      })
    }else{
    this.interval=setInterval(()=>{
      this.timerVal=this.timerVal+1
      this.timerListener.next(this.timerVal)
    },1000)
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
}
