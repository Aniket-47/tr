import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { fadeAnimation } from '../../animations';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss'],
  animations: [fadeAnimation]
})
export class FPasswordComponent implements OnInit {

  resMessage: string = "";
  isLoading = false;
  routerConfig = ROUTE_CONFIGS;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private authServ: AuthService,
    private snackbar: SnackBarService) { }

  ngOnInit(): void {
  }

  fpassword() {
    if (this.emailFormControl.valid) {
      this.resMessage = "";
      this.isLoading = true;

      this.authServ.passwordForget(this.emailFormControl.value)
        .subscribe(res => {
          this.isLoading = false;
          this.resMessage = res.message;

          if (res.error) this.emailFormControl.setErrors({ 'customError': true });
          else this.snackbar.open(this.resMessage, "Okay", 0);
        });
    }
  }
}
