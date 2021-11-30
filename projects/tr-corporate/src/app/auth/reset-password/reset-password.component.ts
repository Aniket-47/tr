import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from '../../animations';
import { LSkeys, ValidationConstants } from '../../utility/configs/app.constants';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AuthService } from '../services/auth.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password') as FormControl;
  const cnfPassControl = c.get('cnfPass') as FormControl;

  if (passwordControl.pristine || cnfPassControl.pristine) return null;
  if (passwordControl.value === cnfPassControl.value) return null;
  cnfPassControl.setErrors({ passMatch: true });
  return { passMatch: true };
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [fadeAnimation]
})
export class ResetPasswordComponent implements OnInit {
  hidepassword = true;
  hidecnfpass = true;
  isLoading = false;
  routerConfig = ROUTE_CONFIGS;

  token!: string | null;
  type!: string | null;

  constructor(
    private route: ActivatedRoute,
    private authServ: AuthService,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private router: Router) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.token = this.route.snapshot.paramMap.get('token');
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

  resetPassword() {
    // this.authServ.passwordReset(this.token,)
    if (this.resetForm.invalid) {
      for (const e in this.resetForm.controls) {
        this.resetForm.get(e)?.markAsTouched();
        this.resetForm.get(e)?.markAsDirty();
      }
      return;
    }


    if (this.token) {
      this.isLoading = true;
      const { value } = this.resetForm;
      if (this.type) {
        const payload = {
          userpassword: value.password,
          inviteKey: this.token
        }
        this.authServ.inviteSetPassword(payload).subscribe(res => {
          this.isLoading = false;
          if (!res.error) {
            const message = "Password set successfull, redircting to login"
            this.snackBar.open(message)
            this.router.navigate([this.routerConfig.LOGIN])
          }
          else this.snackBar.open(res.message);
        });
      }
      else {
        const payload = {
          newPassword: value.password,
          confirmPassword: value.cnfPass,
        };
        this.authServ.passwordReset(this.token, payload).subscribe(res => {
          this.isLoading = false;
          if (!res.error) {
            const message = "Password reset successfull, redircting to login"
            this.snackBar.open(message);
            this.router.navigate([this.routerConfig.LOGIN])
          }
          else this.snackBar.open(res.message);
        });
      }
    }

  }

}
