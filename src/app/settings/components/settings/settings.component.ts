import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PickerController, ToastController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core/dist/types/components/picker/picker-interface';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private pickerController: PickerController, private fb: UntypedFormBuilder, private storage: Storage, private toastController: ToastController, private router: Router) { }
  form: UntypedFormGroup
  saveCount: boolean = false;
  ngOnInit() {
    this.form = this.fb.group({
      countdown: []
    })
    this.storage.get('countdown').then(data => {
      console.log(data)
      this.form.patchValue({ countdown: data || 10 })
    })
  }

  async showPicker() {
    this.saveCount = false;
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            console.log(value.Numbers.value);
            this.form.patchValue({ countdown: value.Numbers.value })
          }
        }
      ],
      columns: [{
        name: 'Numbers',
        options: this.getColumnOptions(), selectedIndex: this.form.value.countdown - 1
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
    // picker.onDidDismiss().then(value=>console.log(value))
  }

  getColumnOptions() {
    let options = [];
    for (let i = 1; i < 99; i++) {
      options.push({ text: i as any, value: i })
    }
    // this.animals.forEach(x => {
    //   options.push({text:x,value:x});
    // });
    return options;
  }

  save() {
    this.saveCount = true;
    this.storage.set('countdown', this.form.value.countdown).then(async data => {
      const toastr = await this.toastController.create(
        { message: 'Saved Successfully!', duration: 1000, color: 'primary', position: 'top' }
      )
      toastr.present()
    })

  }
  saveBack() {
    this.router.navigate(['/home']);
    this.saveCount = false;
  }
}
