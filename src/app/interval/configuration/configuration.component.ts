import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IntervalForm } from 'src/app/shared-module/Models/Interval.Model';
import { IntervalTypes } from 'src/app/shared-module/Models/intervalType.enum';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  rounds;
  workoutTime;
  restTime;
  @Input() interval: IntervalForm;
  public numberOfRounds = [
    {
      name: 'languages',
      options: [
        {
          text: '1',
          value: '1',
        },
        {
          text: '2',
          value: '2',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '5',
          value: '5',
        },
        {
          text: '6',
          value: '6',
        },
        {

          text: '7',
          value: '7',
        },
        {
          text: '8',
          value: '8',
        },
        {
          text: '9',
          value: '9',
        },
        {
          text: '10',
          value: '10',
        },
      ],
    },
  ];
  public numberOfRoundsButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        this.rounds = value.languages.value;
      },
    },
  ];


  public workoutTimes = [
    {
      name: 'languages',
      options: [
        {
          text: '15 Seconds',
          value: '00:00:15',
        },
        {
          text: '30 Seconds',
          value: '00:00:30',
        },
        {
          text: '45 Seconds',
          value: '00:00:45',
        },
        {
          text: '1 Minute',
          value: '00:01:00',
        },
        {
          text: '2 Minutes',
          value: '00:02:00',
        },
        {
          text: '3 Minutes',
          value: '00:03:00',
        },
        {
          text: '4 Minutes',
          value: '00:04:00',
        },
        {
          text: '5 Minutes',
          value: '00:05:00',
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


  public restTimes = [
    {
      name: 'languages',
      options: [
        {
          text: '15 Seconds',
          value: '00:00:15',
        },
        {
          text: '30 Seconds',
          value: '00:00:30',
        },
        {
          text: '45 Seconds',
          value: '00:00:45',
        },
        {
          text: '1 Minute',
          value: '00:01:00',
        },
        {
          text: '2 Minutes',
          value: '00:02:00',
        },
        {
          text: '3 Minutes',
          value: '00:03:00',
        },
        {
          text: '4 Minutes',
          value: '00:04:00',
        },
        {
          text: '5 Minutes',
          value: '00:05:00',
        },
      ],
    },
  ];
  public restTimesButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        this.restTime = value.languages.value;
      },
    },
  ];



  constructor(private modalController: ModalController, private stopwatchService: StopwatchServiceService) { }

  ngOnInit() {
  }

  dismisModal() {
    const data = {
      rounds: this.rounds,
      workoutTime: this.workoutTime,
      restTime: this.restTime
    };
    this.modalController.dismiss(data);
  }
  onBack() {
    this.stopwatchService.timerVal = 0;
    this.modalController.dismiss();
  }
}
