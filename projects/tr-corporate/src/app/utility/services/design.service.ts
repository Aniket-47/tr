import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  isDrawerOpen = new BehaviorSubject(false);
  isDrawerOpen$ = this.isDrawerOpen.asObservable();
  constructor() { }

  setDrawerOpen(data: boolean) {
    console.log(data)
    this.isDrawerOpen.next(data)
  }

  getRoleClass(roletypeid: number) {
    return {
      'success': roletypeid === 2,
      'info': roletypeid === 1,
      'rm': roletypeid === 4,
      'dm': roletypeid === 5,
      'bm': roletypeid === 6,
      'bl': roletypeid === 7,
      'vn': roletypeid === 8,
      'nh': roletypeid === 9,
      'hr': roletypeid === 3
    }
  }
}
