import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interval } from 'src/app/shared-module/Models/allInterval.Modal';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {

  constructor(public router: Router, private saveState: SaveStateService) { }
  workout: Interval[];
  async ngOnInit() {
    this.workout = await this.saveState.getWorkoutLog();
  }

  goTo(tabName: string, id: string) {
    this.router.navigate(['/home/workout', tabName], { queryParams: { id: id } });
  }

}
