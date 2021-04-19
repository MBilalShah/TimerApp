import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {Storage} from '@ionic/storage'
import { IntervalForm } from '../shared-module/Models/Interval.Model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  is_landscape:boolean=false
  constructor(public router:Router,private orientation:ScreenOrientation,private storage:Storage,private insomnia:Insomnia) {
    this.insomnia.keepAwake()
  .then(
    () => console.log('success'),
    () => console.log('error')
  );

    this.onOrientationChange()
    this.orientation.onChange().subscribe(data=>{
      console.log('orientation changed',data,this.orientation.type)
  this.onOrientationChange()
    })
    this.updateFields()
  }


  async updateFields() {

    const current_keys= await this.storage.keys()
    const exists = current_keys.includes('intervals')

    if(!exists){
      this.storage.set('intervals',[
        {"title":"TABATA","workoutTime":"00:00:20","restTime":"00:00:10","rounds":8,"default":true,"id":"asd213c213123c12",noOfLoops:1,timeBetweenLoops:'00:00:00'}
        ,{"title":"FGB 1","workoutTime":"00:05:00","restTime":"00:01:00","rounds":5,"default":true,"id":"asd213c213123c13",noOfLoops:1,timeBetweenLoops:'00:00:00'}
        ,{"title":"FGB 2","workoutTime":"00:05:00","restTime":"00:01:00","rounds":3,"default":true,"id":"asd213c213123c14",noOfLoops:1,timeBetweenLoops:'00:00:00'}
        ,{"title":"EMOM 20","workoutTime":"00:01:00","restTime":"00:00:00","rounds":20,"default":true,"id":"asd213c213123c15",noOfLoops:1,timeBetweenLoops:'00:00:00'}
      ] as IntervalForm[])
    }
    // const storageName = 'myFields';

    // const currentKeys = await this.storage.keys();

    // if(!currentKeys.some(k => k === storageName)) {
    //     const array: {}[] = [{ "username":"Name & Surname*", "email":"Email*", "cellnumber":"Cell Number*", "displayname":"Displayname*", "profilepicture":"urlpath", "projectname":"Projectname", "dateadded":"Dateadded", "notes":"Notes", "image":"Image", "taskname":"Taskname", "taskdescription":"Taskdescription", "taskimage":"Taskimage" }];

    //     await this.storage.set(storageName, array);
    // }

}

  goTo(tabName:string){
    this.router.navigate([`/home/${tabName}`])
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
}
