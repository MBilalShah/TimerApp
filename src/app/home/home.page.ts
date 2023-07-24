import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage'
import { Interval, IntervalForm } from '../shared-module/Models/Interval.Model';
import { IntervalId } from '../shared-module/Models/interval-id.enum';
import { ModalController } from '@ionic/angular';
import { ConfigurationComponent } from '../interval/configuration/configuration.component';
import { ConfigurationComponentComponent } from '../stop-watch/configuration-component/configuration-component.component';
import { StopwatchServiceService } from '../shared-module/services/stopwatch-service.service';
import { IntervalTypes } from '../shared-module/Models/intervalType.enum';
import { ConfigAmrapComponent } from '../amrap/config-amrap/config-amrap.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  is_landscape: boolean = false
  intervals: IntervalForm[] = [];
  constructor(public router: Router, private orientation: ScreenOrientation, private storage: Storage, private insomnia: Insomnia, private modalController: ModalController, private stopWatchService: StopwatchServiceService) {
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );

    this.onOrientationChange()
    this.orientation.onChange().subscribe(data => {
      console.log('orientation changed', data, this.orientation.type)
      this.onOrientationChange()
    })
    this.updateFields().then(async () => {
      this.intervals = await this.storage.get('intervals');
    });


  }
  ngOnInit(): void {
  }


  async updateFields() {
    const current_keys = await this.storage.keys()
    const exists = current_keys.includes('intervals');
    if (!exists) {
      this.storage.set('intervals', [
        { "title": "TABATA", "workoutTime": "00:00:20", "restTime": "00:00:10", "rounds": 8, "default": true, "id": IntervalId.TABATA, noOfLoops: 1, timeBetweenLoops: '00:00:00' }
        , { "title": "EMOM", "workoutTime": "00:01:00", "restTime": "00:00:00", "rounds": 20, "default": true, "id": IntervalId.EMOM, noOfLoops: 1, timeBetweenLoops: '00:00:00' }
      ] as IntervalForm[])
    }
    // const storageName = 'myFields';

    // const currentKeys = await this.storage.keys();

    // if(!currentKeys.some(k => k === storageName)) {
    //     const array: {}[] = [{ "username":"Name & Surname*", "email":"Email*", "cellnumber":"Cell Number*", "displayname":"Displayname*", "profilepicture":"urlpath", "projectname":"Projectname", "dateadded":"Dateadded", "notes":"Notes", "image":"Image", "taskname":"Taskname", "taskdescription":"Taskdescription", "taskimage":"Taskimage" }];

    //     await this.storage.set(storageName, array);
    // }

    return;

  }

  async goTo(tabName: string) {
    if (IntervalTypes.AMRAP == tabName) {
      const modal = await this.modalController.create({
        component: ConfigAmrapComponent,
        cssClass: 'my-custom-class',
        componentProps: { tabName: tabName }
      });
      modal.present();
      const data = await modal.onDidDismiss();
      if (data.data) {
        console.log('range:', data.data.workoutTime)
        this.storage.set('range', data.data.workoutTime)
        this.router.navigate([`/home/${tabName}`])
      }
    }
    else if (IntervalTypes.FORTIME == tabName) {
      const modal = await this.modalController.create({
        component: ConfigurationComponentComponent,
        cssClass: 'my-custom-class',
        componentProps: { tabName: tabName }
      });
      modal.present();
      const data = await modal.onDidDismiss();
      if (data.data) {
        console.log('range:', data.data.workoutTime)
        this.storage.set('range', data.data.workoutTime)
        this.router.navigate([`/home/${tabName}`])
      }
    } else {
      this.router.navigate([`/home`])
    }
  }

  goToWorkout(tabName: string) {
    this.router.navigate([`/home/${tabName}`])
  }

  onOrientationChange() {
    if (this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE_PRIMARY
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.LANDSCAPE_SECONDARY
    ) {
      this.is_landscape = true
    } else if (
      this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_PRIMARY
      ||
      this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_SECONDARY
    ) {
      this.is_landscape = false;
    }
  }

  async openInterval(interval: IntervalForm) {
    const modal = await this.modalController.create({
      component: ConfigurationComponent,
      cssClass: 'my-custom-class',
      componentProps: { interval: interval }
    });
    modal.present();
    const data = await modal.onDidDismiss();
    if (data.data) {
      const { rounds, workoutTime, restTime } = data.data
      interval.rounds = rounds;
      interval.workoutTime = workoutTime;
      interval.restTime = restTime;
      this.storage.set("intervals", this.intervals)
      this.router.navigate([`home/interval/interval-timer/${interval.id}`])
    } else {
      window.location.reload();
    }
  }
}
