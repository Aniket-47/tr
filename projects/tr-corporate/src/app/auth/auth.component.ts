import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStepper } from './store/selectors/auth.selector';
import { Iauth } from './store/interface/auth';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  leftPanelImg: string;

  //stepper
  stepperPages: string[] = [];
  showStepper = false;
  activeStepper = 0;

  constructor(
    private store: Store<Iauth>) {
    this.leftPanelImg = "assets/images/shu-Corporate-background-checks-man-ticking-boxes-130944260-1500x1000.jpg"
  }

  ngOnInit(): void {
    this.store.select(getStepper).subscribe(data => {
      console.log(data)
      this.stepperPages = data.stepList;
      this.showStepper = data.showStepper;
      this.activeStepper = data.active;
    });
  }
}
