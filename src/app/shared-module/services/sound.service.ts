import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import {} from '/src/assets/sounds/bell-sound.mp3'
@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private nativeAudio: NativeAudio) {
    this.nativeAudio.preloadSimple('bell', '/src/assets/sounds/bell-sound.mp3').then(()=>{console.log('success')}), (error)=>{console.error(error)});

    

   }

   playSound(){
    this.nativeAudio.play('bell', () => console.log('uniqueId1 is done playing'));
   }
  
}
