import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {

  stepperPages = ['Company Type', 'Register'];
  currentStep = 0;
constructor() { }

  ngOnInit(): void {
  }

}
