import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-interval-form',
  templateUrl: './interval-form.component.html',
  styleUrls: ['./interval-form.component.scss'],
})
export class IntervalFormComponent implements OnInit {

  constructor(private modalController:ModalController,private fb:FormBuilder,private alertController:AlertController) { }

  form:FormGroup
  ngOnInit() {
    this.form=this.fb.group({
      title:['',[Validators.required]],
      workoutTime:['00:00:00',[Validators.required]],
      restTime:['00:00:00',[Validators.required]],
      rounds:['',[Validators.required]]
    })

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
