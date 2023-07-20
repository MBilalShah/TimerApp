import { Injectable } from '@angular/core';
import { Storage as storageClass } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class SaveStateService {
  // TABATA: TABATA = {
  //   title: 'TABATA',
  //   workoutTime: '00:30',
  //   restTime: '00:20',
  //   rounds: 2,
  //   id: '1',
  //   noOfLoops: 2,
  //   timeBetweenLoops: '00:10',
  //   default: true
  // };
  // EMOM: EMOM = {
  //   title: 'EMOM',
  //   workoutTime: '00:30',
  //   restTime: '00:20',
  //   rounds: 2,
  //   id: '2',
  //   noOfLoops: 2,
  //   timeBetweenLoops: '00:10',
  //   default: true
  // };
  // FORTIME: FORTIME = {
  //   title: 'FORTIME',
  //   workoutTime: '00:30',
  //   restTime: '00:20',
  //   rounds: 2,
  //   id: '3',
  //   noOfLoops: 2,
  //   timeBetweenLoops: '00:10',
  //   default: true
  // };
  // AMPRAP: AMPRAP = {
  //   title: 'AMPRAP',
  //   workoutTime: '00:30',
  //   restTime: '00:20',
  //   rounds: 2,
  //   id: '4',
  //   noOfLoops: 2,
  //   timeBetweenLoops: '00:10',
  //   default: true
  // }
  workoutSave = [
    {
      title: 'AMPRAP',
      workoutTime: '00:30',
      restTime: '00:20',
      round: [
        {
          noRounds: 1,
          timeBetween: '003:34',
        },
        {
          noRounds: 2,
          timeBetween: '00:34',
        },
        {
          noRounds: 1,
          timeBetween: '02:32',
        }
      ],
      id: '4',
      noOfLoops: 2,
      timeBetweenLoops: '00:10',
      default: true
    },
    {
      title: 'FORTIME',
      workoutTime: '00:30',
      restTime: '00:20',
      round: [
        {
          noRounds: 1,
          timeBetween: '003:34',
        },
        {
          noRounds: 2,
          timeBetween: '00:34',
        },
        {
          noRounds: 1,
          timeBetween: '02:32',
        }
      ],
      id: '3',
      noOfLoops: 2,
      timeBetweenLoops: '00:10',
      default: true
    },
    {
      title: 'EMOM',
      workoutTime: '00:30',
      restTime: '00:20',
      rounds: 2,
      id: '2',
      noOfLoops: 2,
      timeBetweenLoops: '00:10',
      default: true
    },
    {
      title: 'TABATA',
      workoutTime: '00:30',
      restTime: '00:20',
      rounds: 2,
      id: '1',
      noOfLoops: 2,
      timeBetweenLoops: '00:10',
      default: true
    }
  ]
  constructor(private storage: storageClass) { }


  saveState(screen: any, data: any) {
    return this.storage.set(screen, data)
  }

  getState(screen: any) {
    return this.storage.get(screen)
  }
  getWorkoutLog() {
    return this.storage.get('workout');
  }
  saveWorkoutLog(data: any[]) {
    this.storage.set('workout', data);
  }
}

export interface SaveState {
  screen: ScreenEnum,
  data: any
}

export enum ScreenEnum {
  clock = 'clock',
  stopwatch = 'stopwatch',
  counter = 'counter',
  interval = 'interval',
  interval_form = 'interval_form',
  interval_timer = 'interval_timer',
}
