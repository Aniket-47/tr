import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss']
})
export class FPasswordComponent implements OnInit, OnChanges {

  resMessage: string="";
  isLoading = false;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (propName === "emailValidationError" && changes[propName].currentValue) {
        this.emailFormControl.setErrors({ "emailValidationError": true });
      }
    }
  }

  emailFormControl=new FormControl('',[
    Validators.required,
    Validators.email
  ])

  fpassword() {
    this.isLoading = true;
    this.emailFormControl.valid && this.authServ.passwordForget(this.emailFormControl.value)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.resMessage=res.message;        
      })
  }
}