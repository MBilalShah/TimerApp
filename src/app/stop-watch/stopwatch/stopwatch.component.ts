import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { StopwatchServiceService } from 'src/app/shared-module/services/stopwatch-service.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonContent, Platform, ToastController } from '@ionic/angular';
import { SaveStateService, ScreenEnum } from 'src/app/shared-module/services/save-state.service';
import { Subscription } from 'rxjs';
import { IntervalId } from 'src/app/shared-module/Models/interval-id.enum';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { IntervalAll } from 'src/app/shared-module/Models/allInterval.Modal';
@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {
  timerRange: number;
  workout: any[] = [];
  workoutDone: boolean = false;
  constructor(public stopWatchService: StopwatchServiceService, private orientation: ScreenOrientation, private saveStateService: SaveStateService, private platform: Platform, private toastController: ToastController, public router: Router, private storage: Storage) {
    // this.platform.pause.subscribe(data =>
    //   this.saveState()
    // )
    this.workoutDone = false;
    this.stopWatchService.resetTimer();
  }
  subscription: Subscription
  is_landscape: boolean = false;
  laps: any[] = []
  @ViewChild('content') content: IonContent;
  intervalAll: IntervalAll;

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
    this.workoutDone = false;
    this.workout = await this.saveStateService.getWorkoutLog();
    this.timerRange = await this.storage.get('range');
    debugger
    this.subscription = this.stopWatchService.timerListener.subscribe(async timer => {
      if (this.timerRange === timer) {
        const currentDate = new Date();
        const dateFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString(undefined, dateFormatOptions as any);
        const timeFormatOptions = { hour: '2-digit', minute: '2-digit' };
        const formattedTime = currentDate.toLocaleTimeString(undefined, timeFormatOptions as any);
        const date = new Date(0);
        date.setSeconds(this.stopWatchService.timerVal);
        const timeString = date.toISOString().substring(11, 19);
        this.intervalAll = {
          title: 'FORTIME',
          id: IntervalId.FORTIME,
          date: formattedDate,
          time: formattedTime,
          round: this.laps,
          workoutTime: timeString,
        }
        debugger
        this.workout.push(this.intervalAll);
        this.saveStateService.saveWorkoutLog(this.workout);
        const toast = await this.toastController.create({
          message: 'Workout Done and Saved !',
          duration: 3000,
          position: 'top'
        });
        await toast.present();
        this.workoutDone = true;
        this.stopWatchService.endTimer()
        this.reset()
      }
    })
    this.onOrientationChange()
    this.orientation.onChange().subscribe(data => {
      console.log('orientation changed', data, this.orientation.type)
      this.onOrientationChange()
    })

  }
  ionViewDidEnter() {
    this.getState()
    this.stopWatchService.initializeFiles()
  }
  saveState() {
    this.saveStateService.saveState(ScreenEnum.stopwatch, {
      laps: this.laps,
      timerVal: this.stopWatchService.timerVal
    })
  }

  async getState() {
    const data = await this.saveStateService.getState(ScreenEnum.stopwatch)
    if (data) {
      this.laps = data.laps
      this.stopWatchService.timerVal = data.timerVal
    }
  }

  scrolltobottom() {
    console.log(this.content)

    this.content ? this.content.scrollToBottom() : null;
  }

  startTimer() {
    this.stopWatchService.startTimer()
  }
  stopTimer() {

    this.stopWatchService.stopTimer()
  }
  lapTime() {
    if (this.stopWatchService.isStarted) {
      const now = this.stopWatchService.getTime()
      this.laps.push(now)
      this.scrolltobottom()
    }
  }
  resume() {
    this.stopWatchService.resumeTimer()
  }
  reset() {
    this.stopWatchService.resetTimer()
    this.laps = []
    this.saveState()
  }
  ionViewDidLeave() {
    this.workoutDone = false;
    this.subscription.unsubscribe()
    // this.saveState()
    this.stopWatchService.stopTimer()
    this.stopWatchService.resetTimer()
    this.laps = []
    this.stopWatchService.unloadFiles()

  }
  backTo() {
    this.reset();
    this.router.navigate(['/home']);
  }
}
