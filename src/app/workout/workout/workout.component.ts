import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntervalAll } from 'src/app/shared-module/Models/allInterval.Modal';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  search: boolean = false;
  constructor(public router: Router, private saveState: SaveStateService) { }
  workout: IntervalAll[];
  filteredWorkout: IntervalAll[];
  async ngOnInit() {
    try {
      this.workout = await this.saveState.getWorkoutLog();
      console.log('workout logs', this.workout)
      this.filterWorkout('');
    } catch (error) {
      console.error('Error loading workout data:', error);
    }
  }

  goTo(tabName: string, id: number) {
    this.router.navigate(['/home/workout', tabName], { queryParams: { id: id } });
  }

  deleteWorkout(id: number) {
    this.workout.splice(id, 1);
    this.saveState.saveWorkoutLog(this.workout);
    this.filterWorkout('');
  }

  onSearch(event: any) {
    this.search = true;
    const searchText = event.target.value.toLowerCase();
    this.filterWorkout(searchText);
  }

  private filterWorkout(searchText: string) {
    this.filteredWorkout = this.workout.filter(
      (item) => item.title.toLowerCase().includes(searchText)
    );
  }
}
