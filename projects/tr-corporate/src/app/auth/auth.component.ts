import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActiveStepperIndex, getStepper, isActiveStepper } from './store/selectors/auth.selector';
import { Iauth } from './store/interface/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  leftPanelImg: string;

  //stepper
  stepperPages: string[] = [];
  showStepper$: Observable<boolean>;
  activeStepper: number = 0;

  constructor(
    private store: Store<Iauth>) {
    this.leftPanelImg = "assets/images/auth_page.svg";
    this.showStepper$ = this.store.select(isActiveStepper);
  }

  ngOnInit(): void {
    this.store.select(getStepper).subscribe(data => {
      this.stepperPages = data;
    });

    this.store.select(getActiveStepperIndex).subscribe(data => this.activeStepper = data)
  }
}
