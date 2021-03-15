import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  time:string;
  interval;
  _12hour:boolean=true
  ionViewDidEnter(){
    this.interval= setInterval(()=>{
      this.time=this.getDate()
    },1000)
  }
  getDate(){
    const time=new Date()
    return time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric',second:'numeric', hour12: this._12hour })
  }

  ionViewDidLeave(){
    clearInterval(this.interval)
  }

  toggleDateFormat(){
    this._12hour=!this._12hour
    this.time=this.getDate()
  }
}
