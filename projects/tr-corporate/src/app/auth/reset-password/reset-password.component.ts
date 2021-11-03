import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationConstants } from '../../utility/configs/app.constants';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AuthService } from '../services/auth.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password') as FormControl;
  const cnfPassControl = c.get('cnfPass') as FormControl;

  if (passwordControl.pristine || cnfPassControl.pristine) return null;
  if (passwordControl.value === cnfPassControl.value) return null;
  return { match: true };
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  token: string | null = "";

  constructor(private route: ActivatedRoute, private authServ: AuthService, private fb: FormBuilder, private snackBar: SnackBarService) { }

  ngOnInit(): void {
  }

  // Form
  resetForm: FormGroup = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(ValidationConstants.passwordStrategy.PASSWORD_MIN_LENGTH),
      Validators.maxLength(ValidationConstants.passwordStrategy.PASSWORD_MAX_LENGTH)
    ]],
    cnfPass: ['', [Validators.required]],
  }, { validators: passwordMatcher });

  // getters
  get password(): AbstractControl {
    return this.resetForm.get('password') as FormControl;
  }
  get cnfPass(): AbstractControl {
    return this.resetForm.get('cnfPass') as FormControl;
  }


  reserPassword() {
    // this.authServ.passwordReset(this.token,)
    if (this.resetForm.invalid) {
      for (const e in this.resetForm.controls) {
        this.resetForm.get(e)?.markAsTouched();
        this.resetForm.get(e)?.markAsDirty();
      }
      return;
    }


    const { value } = this.resetForm;
    const token = this.route.snapshot.paramMap.get('token') || "";
    const payload = {
      newPassword: value.password,
      confirmPassword: value.cnfPass,
    };
    this.authServ.passwordReset(token, payload).subscribe(res => {
      if (!res.error) {
        const message = "Password reset successfull, redircting to login"
        this.snackBar.open(message)
      }
      else {
        this.snackBar.open(res.message)
      }

    });
  }

}
