import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  isDrawerOpen = new BehaviorSubject(false);
  isDrawerOpen$ = this.isDrawerOpen.asObservable();
  constructor() {}

  setDrawerOpen(data: boolean){
      console.log(data)
      this.isDrawerOpen.next(data)
  }
}
