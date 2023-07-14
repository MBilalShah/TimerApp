import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {

  constructor(public router: Router) { }
  ngOnInit() {
  }

  goTo(tabName: string) {
    this.router.navigate([`/home/workout/${tabName}`])
  }

}
