import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-config-amrap',
  templateUrl: './config-amrap.component.html',
  styleUrls: ['./config-amrap.component.scss'],
})
export class ConfigAmrapComponent implements OnInit {

  workoutTime;
  @Input() tabName: string;

  public workoutTimes = [
    {
      name: 'languages',
      options: [
        {
          text: '30 Seconds',
          value: 30,
        },
        {
          text: '1 Minute',
          value: 60,
        },
        {
          text: '2 Minutes',
          value: 120,
        },
        {
          text: '3 Minutes',
          value: 180,
        },
        {
          text: '4 Minutes',
          value: 240,
        },
        {
          text: '5 Minutes',
          value: 300,
        },
        {
          text: '6 Minute',
          value: 360,
        },
        {
          text: '7 Minutes',
          value: 420,
        },
        {
          text: '8 Minutes',
          value: 480,
        },
        {
          text: '9 Minutes',
          value: 540,
        },
        {
          text: '10 Minutes',
          value: 600,
        },
      ],
    },
  ];
  public workoutTimesButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        this.workoutTime = value.languages.value;
      },
    },
  ];



  constructor(private modalController: ModalController) {
   }

  ngOnInit() {
    console.log(this.tabName)
  }

  dismisModal() {
    const data = {
      workoutTime: this.workoutTime,
    };
    this.modalController.dismiss(data);
  }
  onBack() {
    this.modalController.dismiss();
  }

}
