import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { generateId } from 'src/app/shared-module/helper';

@Component({
  selector: 'app-interval-form',
  templateUrl: './interval-form.component.html',
  styleUrls: ['./interval-form.component.scss'],
})
export class IntervalFormComponent implements OnInit {

  constructor(private modalController:ModalController,private fb:FormBuilder,private alertController:AlertController) { }

  form:FormGroup
  @Input() editMode:boolean=false;
  @Input() interval;
  ngOnInit() {

    this.form=this.fb.group({
      id:[generateId()],
      title:['',[Validators.required]],
      workoutTime:['00:00:00',[Validators.required]],
      restTime:['00:00:00',[Validators.required]],
      rounds:['',[Validators.required]]
    })

    this.editMode? this.form.patchValue(this.interval):null

  }

  dismissModal(){
    this.modalController.dismiss()
  }

  async save(){
    if(this.form.invalid){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'Missing Fields',
        message: 'Please fill all fields.',
        buttons: ['OK']
      })

     return await alert.present();
    }

    this.modalController.dismiss(this.form.value)


  }
}
