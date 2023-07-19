import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {


  public pickerColumns = [
    {
      name: 'languages',
      options: [
        {
          text: '1 Minute',
          value: '00:01:00',
        },
        {
          text: '2 Minutes',
          value: '00:02:00',
        },
        {
          text: '3 Minutes',
          value: '00:03:00',
        },
        {
          text: '4 Minutes',
          value: '00:04:00',
        },
      ],
    },
  ];

  public numberColumns = [
    {
      name: 'languages',
      options: [
        {
          text: '1 Minute',
          value: '00:01:00',
        },
        {
          text: '2 Minutes',
          value: '00:02:00',
        },
        {
          text: '3 Minutes',
          value: '00:03:00',
        },
        {
          text: '4 Minutes',
          value: '00:04:00',
        },
      ],
    },
  ];

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        window.alert(`You selected: ${value.languages.value}`);
      },
    },
  ];


  constructor() { }

  ngOnInit() { }

}
