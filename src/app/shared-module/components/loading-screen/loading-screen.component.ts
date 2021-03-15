import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StopwatchServiceService } from '../../services/stopwatch-service.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {

  constructor(private stopwatchService:StopwatchServiceService,private modal:ModalController) { }

  // @Input() timer:number=0
  ngOnInit() {}

  ionViewDidEnter(){
    this._timer()
  }
  buffer:number=0
  _timer(){
     this.buffer=100
    const interval= setInterval(()=>{
      this.buffer=this.buffer-1
      if(this.buffer &&this.buffer<=3){
        this.stopwatchService.playSound('beep')
      }
      if(this.buffer==0){
        this.stopwatchService.playSound('bell')
      }
      // modal['componentProps']['timer']=buffer
      // loading.message=`Starting in ${buffer} seconds`
      if(this.buffer==0){
        this.modal.dismiss()
        // loading.dismiss()
        clearInterval(interval)

      }
    },1000)
  }

}
