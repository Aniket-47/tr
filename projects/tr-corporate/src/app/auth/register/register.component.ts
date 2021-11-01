import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { setStepper } from '../store/actions/auth.action';
import { Iauth } from '../store/interface/auth';
import { getCurrentStepper, getStepper } from '../store/selectors/auth.selector';

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
})
export class RegisterComponent implements OnInit {
  hide = true;
  isLoading = false;
  stepperPages: string[] = [];
  currentStep = 1;

  // Form
  registerForm: FormGroup = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    middleName: [
      '',
      [Validators.minLength(3), Validators.maxLength(20)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    cnfPass: ['', [Validators.required]],
  }, {validators: passwordMatcher});

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store<Iauth>) {}

  ngOnInit(): void {

    this.store.select(getCurrentStepper).subscribe(data => this.currentStep = data);
    this.store.select(getStepper).subscribe(data => this.stepperPages = data);
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
      accounttypeid: roleId
    };

    this.isLoading = true;
    this.authService.register(payload).subscribe(res => {
      this.isLoading = false;
      if(res) this.router.navigateByUrl('register-success');
    }, (err) => this.isLoading = false)
  }

  goToPrev() {
    this.store.dispatch(setStepper({data: 0}));
    this.router.navigateByUrl('auth/selectrole');
  }
}
