import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss']
})
export class FPasswordComponent implements OnInit {

  resMessage: string = "";
  isLoading = false;

  constructor(
    private authServ: AuthService,
    private snackbar: SnackBarService) { }

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

      this.authServ.passwordForget(this.emailFormControl.value)
        .subscribe(res => {

          this.isLoading = false;

          this.resMessage = res.message;


          if (res.error === "true")
            this.emailFormControl.setErrors({ 'customError': true });

          else
            this.snackbar.open(this.resMessage, "Okay", 0);

        })
    }

  }


}
