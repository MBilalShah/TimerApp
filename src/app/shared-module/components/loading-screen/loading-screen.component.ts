import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StopwatchServiceService } from '../../services/stopwatch-service.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {

  constructor(private stopwatchService:StopwatchServiceService,private modal:ModalController,private storage:Storage) { }

  // @Input() timer:number=0
  interval
  ngOnInit() {}

  ionViewDidEnter(){
    this._timer()
  }
  buffer:number=0
  async _timer(){
     this.buffer= await this.storage.get('countdown') || 10
    this.interval= setInterval(()=>{
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
        clearInterval(this.interval)

      }
    },1000)
  }

  skipLoading(){
    this.modal.dismiss()
    this.stopwatchService.playSound('bell')
    clearInterval(this.interval)
  }
}
