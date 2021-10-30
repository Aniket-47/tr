import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {

  stepperPages = ['Company Type', 'Register'];
  currentStep = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  roleHandler(roleType: string) {
    this.router.navigateByUrl('auth/register');
  }

}
