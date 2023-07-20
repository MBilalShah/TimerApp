import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Interval } from 'src/app/shared-module/Models/allInterval.Modal';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
})
export class WorkoutDetailComponent implements OnInit {
  workoutDetail: Interval;
  id = '';

  constructor(private route: ActivatedRoute, private saveState: SaveStateService) { }
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    const workoutLog = await this.saveState.getWorkoutLog();
    console.log('work', workoutLog);
    this.workoutDetail = workoutLog.find(obj => obj.id == this.id);
    if (this.workoutDetail) {
      console.log('Found Object:', this.workoutDetail);
    } else {
      console.log('Object not found');
    }
  }

}
