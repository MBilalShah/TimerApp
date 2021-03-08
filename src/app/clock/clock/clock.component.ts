import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.interval= setInterval(()=>{
      this.time=this.getDate()
    },1000)
  }

  time:string;
  interval;
  _12hour:boolean=true
  getDate(){
    const time=new Date()
    return time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric',second:'numeric', hour12: this._12hour })
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }
}
