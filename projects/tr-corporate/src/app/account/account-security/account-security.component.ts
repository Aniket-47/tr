import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationConstants } from '../../utility/configs/app.constants';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AccountService } from '../shared/account.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password') as FormControl;
  const cnfPassControl = c.get('cnfPass') as FormControl;

  if (passwordControl.pristine || cnfPassControl.pristine) return null;
  if (passwordControl.value === cnfPassControl.value) return null;
  cnfPassControl.setErrors({ passMatch: true })
  return { passMatch: true };
}


@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent implements OnInit {
  hide = true;
  errorMessage: string ="";
  isLoading = false;

  constructor( 
    private accoutService: AccountService,
    private fb: FormBuilder, 
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  // Form
  changePasswordForm: FormGroup = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(ValidationConstants.passwordStrategy.PASSWORD_MIN_LENGTH),
      Validators.maxLength(ValidationConstants.passwordStrategy.PASSWORD_MAX_LENGTH)
    ]],
    cnfPass: ['', [Validators.required]],
    oldPassword: ['', [Validators.required]]
  }, { validators: passwordMatcher });

  // getters
  get password(): AbstractControl {
    return this.changePasswordForm.get('password') as FormControl;    
  }
  get cnfPass(): AbstractControl {
    return this.changePasswordForm.get('cnfPass') as FormControl;
  }

  savePassword() {
    this.isLoading = true;

    if (this.changePasswordForm.invalid) {
      for (const e in this.changePasswordForm.controls) {
        this.changePasswordForm.get(e)?.markAsTouched();
        this.changePasswordForm.get(e)?.markAsDirty();
      }
      return;
    }

    const { value } = this.changePasswordForm;
    const payload = {
      newPassword: value.password,
      confirmPassword: value.cnfPass,
      oldPassword: value.oldPassword,
    };

    this.accoutService.changePassword(payload).subscribe(res => {
      this.isLoading = false;
      if (res.error) {
        const message = "Password changed successfully!";
        this.snackBar.open(message);
      } else {
        // this.snackBar.open(res.message)
        this.errorMessage = res.message; 
        this.password.setErrors({ 'customError': true });
        console.log(res.message);        
      }
    });
  }

  resetHandler() {
    this.changePasswordForm.reset({
      newPassword: '',
      confirmPassword: '',      
      oldPassword: '',
    });
    console.log(this.changePasswordForm)
  }

}
