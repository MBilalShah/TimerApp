import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PickerController, ToastController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core/dist/types/components/picker/picker-interface';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private pickerController:PickerController,private fb:FormBuilder,private storage:Storage,private toastController:ToastController) { }

  form:FormGroup
  ngOnInit() {
    this.form=this.fb.group({
      countdown:[]
    })
    this.storage.get('countdown').then(data=>{
      console.log(data)
      this.form.patchValue({countdown:data || 10})
    })
  }

  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            console.log(value.Numbers.value);
            this.form.patchValue({countdown:value.Numbers.value})
          }
        }
      ],
      columns:[{
        name:'Numbers',
        options:this.getColumnOptions(),selectedIndex:this.form.value.countdown
      }]
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

  save(){
    this.storage.set('countdown',this.form.value.countdown).then(async data=>{
     const toastr= await this.toastController.create(
        {message:'Saved Successfully!',duration:1000,color:'primary'}
      )
      toastr.present()
    })

  }
}
