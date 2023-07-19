import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { from } from 'rxjs';
import { IntervalFormComponent } from '../interval-form/interval-form.component';
import { Storage as storageClass } from '@ionic/storage'
import { Router } from '@angular/router';
import { generateId } from 'src/app/shared-module/helper';
import { Interval, IntervalForm } from 'src/app/shared-module/Models/Interval.Model';
import { OptionsMenuComponent } from '../options-menu/options-menu.component';
import { LoopPopupComponent } from '../loop-popup/loop-popup.component';
@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.scss'],
})
export class IntervalComponent implements OnInit {

  constructor(public modalController: ModalController, private storage: storageClass, private alertController: AlertController, private router: Router, private popoverController: PopoverController) { }

  intervals: any[] = []

  async ngOnInit() {

    this.intervals = await this.storage.get('intervals') || []

    console.log((this.intervals))
  }


  async addInterval() {
    const modal = await this.modalController.create({
      component: IntervalFormComponent,
      cssClass: 'my-custom-class',

    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (!data) { return }
    // data.id=generateId()
    this.intervals.push(data);

    this.storage.set('intervals', this.intervals)
  }

  async editInterval(index) {
    const modal = await this.modalController.create({
      component: IntervalFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'editMode': true,
        'interval': this.intervals[index]
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (!data) { return }
    this.intervals[index] = data;

    this.storage.set('intervals', this.intervals)
  }

  async deleteInterval(index: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      subHeader: 'Delete Interval',
      message: 'Are you sure you want to delete this interval permanantly?.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }
        ,
      {
        text: 'Delete',
        handler: () => {
          this.intervals.splice(index, 1)
          this.storage.set('intervals', this.intervals)
        }
      }]
    })

    await alert.present();
  }

  openTimer(interval: IntervalForm) {
    this.router.navigate([`home/interval/interval-timer/${interval.id}`])
  }

  async openMenu(ev, index) {

    const popover = await this.popoverController.create({
      component: OptionsMenuComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        $delete: () => {
          this.popoverController.dismiss()
          this.deleteInterval(index)
        },
        edit: () => {
          this.popoverController.dismiss()
          this.editInterval(index)
        },
        copy: () => {
          this.popoverController.dismiss()
          const data = { ...this.intervals[index] }
          data.title = data.title + '-copy'
          this.intervals.push(data);

          this.storage.set('intervals', this.intervals)
        }
      }
    });
    return await popover.present();
  }

  async loopWorkout(interval_id: string) {
    console.log('click')
    const modal = await this.modalController.create({
      component: LoopPopupComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        interval_id: interval_id
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (!data) { return }
    // data.id=generateId()
    this.intervals.push(data);

    this.storage.set('intervals', this.intervals)
  }
}
