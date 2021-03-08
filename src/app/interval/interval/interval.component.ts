import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { IntervalFormComponent } from '../interval-form/interval-form.component';
import {Storage as storageClass} from '@ionic/storage'
import { Router } from '@angular/router';
@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss'],
})
export class IntervalComponent implements OnInit {

  constructor(public modalController: ModalController,private storage:storageClass,private alertController:AlertController,private router:Router) { }

  intervals:any[]=[]
 async ngOnInit() {

    this.intervals = await this.storage.get('intervals') || []
  }


  async addInterval(){
    const modal = await this.modalController.create({
      component: IntervalFormComponent,
      cssClass: 'my-custom-class',

    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(!data){return}
    this.intervals.push(data);

    this.storage.set('intervals', this.intervals)
  }

  async editInterval(index){
    const modal = await this.modalController.create({
      component: IntervalFormComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        'editMode':true,
        'interval':this.intervals[index]
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(!data){return}
    this.intervals[index]=data;

    this.storage.set('intervals', this.intervals)
  }

 async deleteInterval(index:number){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      subHeader: 'Delete Interval',
      message: 'Are you sure you want to delete this interval permanantly?.',
      buttons: [{
        text:'Cancel',
        role:'cancel'
      }
    ,
  {
    text:'Delete',
    handler:()=>{
      this.intervals.splice(index,1)
      this.storage.set('intervals', this.intervals)
    }
  }]
    })

    await alert.present();
  }

  openTimer(index){
    this.router.navigate([`home/interval/interval-timer/${index}`])

  }
}
