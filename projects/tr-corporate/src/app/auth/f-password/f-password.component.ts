import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss']
})
export class FPasswordComponent implements OnInit {

  resMessage: string = "";
  isLoading = false;
  isError = false;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  fpassword() {

    if (this.emailFormControl.valid) {
      this.resMessage = "";
      this.isLoading = true;
      this.emailFormControl.markAsTouched();

      this.authServ.passwordForget(this.emailFormControl.value)
        .subscribe(res => {
          this.isLoading = false;

          this.isError = res.error;
          this.emailFormControl.setErrors({ 'customError': true })
          this.resMessage = res.message;
        })
    }

  }


}
