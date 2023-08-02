import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntervalAll } from 'src/app/shared-module/Models/allInterval.Modal';
import { SaveStateService } from 'src/app/shared-module/services/save-state.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss'],
})
export class WorkoutDetailComponent implements OnInit, AfterViewInit {
  workoutDetail: IntervalAll;
  id = '';

  constructor(private route: ActivatedRoute, private saveState: SaveStateService) { }
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    const workoutLog = await this.saveState.getWorkoutLog();
    this.workoutDetail = workoutLog[this.id];
    console.log('workout logs detail', this.workoutDetail)
  }
  clickBoard() {
    const data = 'title:' + this.workoutDetail?.title + ', workoutTime:' + this.workoutDetail?.workoutTime + ', restTime:' +
      this.workoutDetail?.restTime + ', for:' + this.workoutDetail?.for + ', every:' + this.workoutDetail?.every + ', date:' + this.workoutDetail?.date + ', time:' + this.workoutDetail?.time +
      +', round:' + JSON.stringify(this.workoutDetail?.round) + ', Rounds:' + this.workoutDetail?.rounds;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(data)
        .then(() => {
          alert('copied clipboard!');
        })
        .catch((error) => {
          console.error('Error copying data to clipboard:', error);
        });
    }
  }

  downloadPdf() {
    const jsonDataString = JSON.stringify(this.workoutDetail, null, 2); // The last argument (2) is for indentation

    const doc = new jsPDF();
    doc.text(jsonDataString, 10, 10); // Insert JSON data as text in the PDF

    doc.save('data.pdf'); // Set the filename as 'data.pdf'
  }
  ngAfterViewInit() {

  }

}
