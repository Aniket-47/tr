import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  stepperPages = ['Company Type', 'Register'];
  currentStep = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
