import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core/dist/types/components/picker/picker-interface';
// import { PickerColumnOption } from 'ionic-angular';
// import { PickerOptions } from 'ionic-angular';
import { generateId } from 'src/app/shared-module/helper';

@Component({
  selector: 'app-interval-form',
  templateUrl: './interval-form.component.html',
  styleUrls: ['./interval-form.component.scss'],
})
export class IntervalFormComponent implements OnInit {

  constructor(private modalController:ModalController,private fb:FormBuilder,private alertController:AlertController,private pickerController:PickerController) { }

  form:FormGroup
  @Input() editMode:boolean=false;
  @Input() interval;
  animals: string[] = ["Tiger", "Lion", "Elephant", "Fox", "Wolf"];

  ngOnInit() {

    this.form=this.fb.group({
      id:[generateId()],
      title:['',[Validators.required]],
      workoutTime:['00:00:00',[Validators.required
        // ,this.validator()
      ]],
      restTime:['00:00:00',[Validators.required
        // ,this.validator()
      ]],
      rounds:['1',[Validators.required]],
      noOfLoops:['1',[Validators.required]],
      timeBetweenLoops:['1',[Validators.required]]
    })

    this.editMode? this.form.patchValue(this.interval):null

  }
  convertToSeconds(time:string){
    const [hours,minutes,seconds]=time.split(':')
    return (parseInt( minutes) * 60) + parseInt( seconds)
  }
  dismissModal(){
    this.modalController.dismiss()
  }

  validator(){
    return (formControl:FormControl)=>{
      const value=formControl.value
      const time= this.convertToSeconds(value)
      return time<5?( {'min_error':true}):null
    }
  }

  async onDateChange($event){
    return
    console.log($event)

    const time= this.convertToSeconds($event.target.value)
    if(time>=5){
      return
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Invalid value',
      message: 'Time must be greater than 5 seconds',
      buttons: ['OK']
    })

   return await alert.present();
  }
  async save(){
    console.log(this.form)
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

    this.modalController.dismiss(this.form.value)


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
  }

  // async showPicker() {
  //   let options: PickerOptions = {
  //     buttons: [
  //       {
  //         text: "Cancel",
  //         role: 'cancel'
  //       },
  //       {
  //         text:'Ok',
  //         handler:(value:any) => {
  //           console.log(value.Numbers.value);
  //           this.form.patchValue({rounds:value.Numbers.value})
  //         }
  //       }
  //     ],
  //     columns:[{
  //       name:'Numbers',
  //       options:this.getColumnOptions(),selectedIndex:this.form.value.rounds
  //     }]
  //   };

  //   let picker = await this.pickerController.create(options);
  //   picker.present()
  //   // picker.onDidDismiss().then(value=>console.log(value))
  // }

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
}



