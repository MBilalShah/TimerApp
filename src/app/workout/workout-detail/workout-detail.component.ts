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
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      const workoutLog = this.saveState.getWorkoutLog();
      this.workoutDetail = workoutLog.find(obj => obj.id === this.id);
      if (this.workoutDetail) {
        console.log('Found Object:', this.workoutDetail);
      } else {
        console.log('Object not found');
      }
    });
  }

}
