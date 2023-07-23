import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Interval, IntervalForm, IntervalType } from 'src/app/shared-module/Models/Interval.Model';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-interval-timer',
  templateUrl: './interval-timer.component.html',
  styleUrls: ['./interval-timer.component.scss'],
})
export class IntervalTimerComponent implements OnInit {

  constructor(public stopwatchService: StopwatchServiceService, private acRoute: ActivatedRoute, private storage: Storage, private orientation: ScreenOrientation, private saveStateService: SaveStateService, private ngZone: NgZone, private toastController: ToastController) {

    this.getState();
  }

  isCompleted: boolean = false
  subscription: Subscription
  percentage: number = 0;
  timer: number = 0
  intervals: Interval[] = []
  activeIndex: number = 0
  is_landscape: boolean = false;
  int: IntervalForm;
  color: string = '#FB331A'
  noOfLoops: number = 1
  restTime: string = "00:00:00"
  roundNo: number = 1;
  intervalType: IntervalType = IntervalType.workout;
  workoutLog: any[] = [];

  ionViewDidEnter() {



    this.stopwatchService.initializeFiles()
    if (!this.restTime) {
      this.getState()
    }

  }

  saveState() {
    this.saveStateService.saveState(this.int.id, {
      percentage: this.percentage,
      timer: this.timer,
      activeIndex: this.activeIndex,
      color: this.color,
      noOfLoops: this.noOfLoops,
      restTime: this.restTime
    })
  }

  async getState() {
    const index = this.acRoute.snapshot.params.index
    const data = await this.saveStateService.getState(index)
    if (data) {
      this.percentage = data.percentage;
      this.timer = data.timer
      this.activeIndex = data.activeIndex
      this.color = data.color
      this.stopwatchService.timerVal = this.timer
      this.subscription = this.stopwatchService.timerListener.subscribe(timer => {
        this.timerListener(timer)
      })
    }
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
  async ngOnInit() {
    this.workoutLog = await this.saveStateService.getWorkoutLog();
    console.log('timer 1:', this.timer),
      this.onOrientationChange()
    this.orientation.onChange().subscribe(data => {
      console.log('orientation changed', data, this.orientation.type)
      this.onOrientationChange()
    })
    const ints = await this.storage.get('intervals') as IntervalForm[]

    const index = this.acRoute.snapshot.params.index

    this.int = ints.find(int => int.id === index)

    console.log(this.int)
    this.noOfLoops = this.int.noOfLoops;
    this.restTime = this.int.timeBetweenLoops

    for (let i = 0; i < this.noOfLoops; i++) {
      for (let i = 0; i < this.int.rounds; i++) {
        this.intervals.push({
          time: this.convertToSeconds(this.int.workoutTime),
          type: IntervalType.workout,
        });
        if (i < this.int.rounds - 1) {
          this.intervals.push({
            time: this.convertToSeconds(this.int.restTime),
            type: IntervalType.rest,
          });
        }
      }
      if (this.restTime && i < this.noOfLoops - 1) {
        this.intervals.push({
          time: this.convertToSeconds(this.restTime),
          type: IntervalType.rest,

        })
      }
    }



    console.log(this.intervals)


  }

  playSound() {
    this.stopwatchService.playSound('bell')
  }
  convertToSeconds(time: string) {
    const [hours, minutes, seconds] = time.split(':')
    return (parseInt(minutes) * 60) + parseInt(seconds)
  }
  // isRest:boolean=false;


  timerListener(timer) {
    const activeInterval: Interval = this.intervals[this.activeIndex]
    this.timer = timer;

    this.percentage = (this.timer / activeInterval.time) * 100
    if (this.timer >= activeInterval.time) {
      if (this.intervals[this.activeIndex + 1]?.time == 0) {
        this.activeIndex = this.activeIndex + 2;
        this.delayOneSecond(() => {
          this.intervalType = this.intervals[this.activeIndex].type
          this.roundNo = (this.floor((this.activeIndex / 2)) % (this.floor(this.ceiling(this.intervals.length / 2) / this.noOfLoops))) + 1
        })
      } else {
        this.activeIndex = this.activeIndex + 1;
        this.delayOneSecond(() => {
          this.intervalType = this.intervals[this.activeIndex].type;
          this.roundNo =
            (this.floor(this.activeIndex / 2) %
              this.floor(
                this.ceiling(this.intervals.length / 2) / this.noOfLoops
              )) +
            1;
        });

      }

      if (this.activeIndex > this.intervals.length - 1) {
        this.stopTimer()
        this.reset()
        this.subscription.unsubscribe()
        this.stopwatchService.playSound('bell')
        this.isCompleted = true;
        return;
      }

      this.playSound()
      this.stopwatchService.resetTimer()

    } else if (activeInterval.time - this.timer <= 3) {
      this.stopwatchService.playSound('beep')
    }
    if (this.intervals[this.activeIndex].time) {
      this.intervals[this.activeIndex].type == 0 ? (this.delayOneSecond(() => {



        this.color = '#FB331A'

      })) : (this.delayOneSecond(() => {


        this.color = '#2D92F8'

      }))
    }

    this.saveState()
  }

  startTimer() {

    this.isCompleted = false
    this.intervals[this.activeIndex].type == 0 ? this.color = '#FB331A' : this.color = '#2D92F8'
    this.stopwatchService.startTimer()

    this.subscription ? this.subscription.unsubscribe() : null;

    this.subscription = this.stopwatchService.timerListener.subscribe(timer => {
      this.timerListener(timer)
    })
  }

  delayOneSecond(callback) {
    setTimeout(() => {
      callback()
    }, 1000);
  }
  async stopTimer() {
    const toast = await this.toastController.create({
      message: 'Workout Done and Saved!',
      duration: 3000,
      position: 'top'
    });
    await toast.present();
    toast.onDidDismiss().then(() => {
      this.workoutLog.push(this.int);
      console.log(this.workoutLog);
      this.saveStateService.saveWorkoutLog(this.workoutLog);
      this.stopwatchService.stopTimer()
    });
  }

  resume() {
    this.stopwatchService.resumeTimer()
  }

  reset() {
    this.color = '#FB331A'
    this.stopwatchService.resetTimer()
    this.timer = 0
    this.activeIndex = 0
    this.percentage = 0
    this.subscription.unsubscribe()
    this.roundNo = 1
  }

  ceiling(val) {
    return Math.ceil(val)
  }

  floor(val) {
    return Math.floor(val)
  }
  ionViewDidLeave() {
    this.subscription ? this.subscription.unsubscribe() : null
    this.stopwatchService.stopTimer()
    this.stopwatchService.resetTimer()
    this.saveState()
    this.stopwatchService.unloadFiles()
  }



}
