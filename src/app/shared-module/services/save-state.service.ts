import { Injectable } from '@angular/core';
import {Storage as storageClass} from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class SaveStateService {

  constructor(private storage:storageClass) { }


  saveState(screen:any,data:any){
    return this.storage.set(screen,data)
  }

  getState(screen:any){
    return this.storage.get(screen)
  }

}

export interface SaveState{
  screen:ScreenEnum,
  data:any
}

export enum ScreenEnum{
  clock='clock',
  stopwatch='stopwatch',
  counter='counter',
  interval='interval',
  interval_form='interval_form',
  interval_timer='interval_timer',
}
