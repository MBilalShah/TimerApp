import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, PickerController } from '@ionic/angular';
// import { PickerOptions } from 'ionic-angular';
import { generateId } from 'src/app/shared-module/helper';

@Component({
  selector: 'app-loop-popup',
  templateUrl: './loop-popup.component.html',
  styleUrls: ['./loop-popup.component.scss'],
})
export class LoopPopupComponent implements OnInit {


  constructor(private modalController:ModalController,private fb:FormBuilder,private alertController:AlertController,private pickerController:PickerController,private router:Router) { }

  form:FormGroup
  @Input() editMode:boolean=false;
  @Input() interval_id:string;

  ngOnInit() {

    this.form=this.fb.group({
      noOfLoops:['',Validators.required],
      timeBetweenLoops:['',Validators.required]
    })



  }

  dismissModal(){
    this.modalController.dismiss()
  }




  async showPicker(columnName) {
    let options: any = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value.Numbers.value);
            this.form.patchValue({ [columnName]: value.Numbers.value });
          },
        },
      ],
      columns: [
        {
          name: 'Numbers',
          options: this.getColumnOptions(),
          selectedIndex: this.form.value[columnName],
        },
      ],
    };

    let picker = await this.pickerController.create(options);
    picker.present()
    // picker.onDidDismiss().then(value=>console.log(value))
  }

  getColumnOptions(){
    let options = [];
    for(let i = 0 ; i<99;i++){
      options.push({text:i as any,value:i})
    }
    // this.animals.forEach(x => {
    //   options.push({text:x,value:x});
    // });
    return options;
  }

  async save(){
    if(this.form.invalid){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'Missing Fields',
        message: 'Please fill all fields correctly.',
        buttons: ['OK']
      })

     return await alert.present();
    }
    const form=this.form.value
    this.dismissModal()
    this.router.navigate([`/home/interval/loop-interval-timer/${this.interval_id}/${form.noOfLoops}/${form.timeBetweenLoops}`])
  }
}



