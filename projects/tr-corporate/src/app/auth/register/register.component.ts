
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RouterConfigService } from '@tr/src/app/utility/services/routeGuards/router-config.service';
import { fadeAnimation } from '../../animations';
import { ValidationConstants } from '../../utility/configs/app.constants';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { AuthService } from '../services/auth.service';
import { setStepper, setStepperShow, setUserRole } from '../store/actions/auth.action';
import { Iauth } from '../store/interface/auth';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password') as FormControl;
  const cnfPassControl = c.get('cnfPass') as FormControl;

  if (passwordControl.pristine || cnfPassControl.pristine) return null;
  if (passwordControl.value === cnfPassControl.value) return null;
  return { match: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation]
})
export class RegisterComponent implements OnInit, OnDestroy {
  hidepassword = true;
  hidecnfpass = true;
  isLoading = false;
  config: any;

  // Form
  registerForm: FormGroup = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(ValidationConstants.userAccountStrategy.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.userAccountStrategy.NAME_MAX_LENGTH)
      ],
    ],
    middleName: [
      '',
      [
        Validators.minLength(ValidationConstants.userAccountStrategy.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.userAccountStrategy.NAME_MAX_LENGTH)
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(ValidationConstants.userAccountStrategy.NAME_MIN_LENGTH),
        Validators.maxLength(ValidationConstants.userAccountStrategy.NAME_MAX_LENGTH)
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    phone: ['',
      [
        Validators.required,
        Validators.minLength(ValidationConstants.userAccountStrategy.PHONE_MIN_LENGTH)
      ]
    ],
    password: ['', [Validators.required]],
    cnfPass: ['', [Validators.required]],
  }, { validators: passwordMatcher });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private configServ: RouterConfigService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackbarServie: SnackBarService,
    private store: Store<Iauth>) {
    this.store.dispatch(setStepperShow({ data: true }));
    this.config = configServ.routerconfig;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.store.dispatch(setStepperShow({ data: false }));
    this.store.dispatch(setStepper({ data: 0 }));
    this.store.dispatch(setUserRole({ data: 0 }));
  }

  // getters
  get firstName(): AbstractControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get middleName(): AbstractControl {
    return this.registerForm.get('middleName') as FormControl;
  }
  get lastName(): AbstractControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get email(): AbstractControl {
    return this.registerForm.get('email') as FormControl;
  }
  get company(): AbstractControl {
    return this.registerForm.get('company') as FormControl;
  }
  get phone(): AbstractControl {
    return this.registerForm.get('phone') as FormControl;
  }
  get password(): AbstractControl {
    return this.registerForm.get('password') as FormControl;
  }
  get cnfPass(): AbstractControl {
    return this.registerForm.get('cnfPass') as FormControl;
  }

  registerHandler() {
    if (this.registerForm.invalid) {
      for (const e in this.registerForm.controls) {
        this.registerForm.get(e)?.markAsTouched();
        this.registerForm.get(e)?.markAsDirty();
      }
      return;
    }


    const { value } = this.registerForm;
    const roleId = this.route.snapshot.paramMap.get('roleId');
    const payload = {
      firstname: value.firstName,
      middlename: value.middleName,
      lastname: value.lastName,
      email: value.email,
      userpassword: value.password,
      name: value.company,
      accounttypeid: roleId ? +roleId : null
    };

    this.isLoading = true;
    this.authService.register(payload).subscribe(res => {
      this.isLoading = false;
      if (res) {
        if(!res.error) this.router.navigate(["./"]);
        if (res.error) {
          this.snackbarServie.open(res?.message, "Ok", 0);
        }
      }
    }, (err) => this.isLoading = false)
  }

  goToPrev() {
    this.store.dispatch(setStepper({ data: 0 }));
    this.store.dispatch(setUserRole({ data: 0 }));
    this.router.navigateByUrl(this.config.REGISTER1);
  }
}
