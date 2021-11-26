import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../animations';
import { userRoles, ValidationConstants } from '../../utility/configs/app.constants';
import { SnackBarService } from '../../utility/services/snack-bar.service';
import { setUserFullName, setUserMobile, setUserName } from '../../utility/store/actions/user.action';
import { State } from '../../utility/store/reducers';
import { getUserDeatils } from '../../utility/store/selectors/user.selector';
import { ACCOUNT_LN } from '../shared/account.lang';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
  animations: [fadeAnimation]
})
export class ManageProfileComponent implements OnInit {
  url: any;
  userForm!: FormGroup;
  roles = userRoles;
  isLoading = false;

  ln = ACCOUNT_LN;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private accoutService: AccountService,
    private snackbarServ: SnackBarService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.loadUser();
  }

  loadUser() {
    this.store.select(getUserDeatils).subscribe(user => {
      console.log(user)
      this.userForm.patchValue({
        firstName: user?.name.firstName,
        middleName: user?.name.middleName,
        lastName: user?.name.lastName,
        mobilenumber: user?.mobileNumber,
        email: user?.email
      });
    });
  }

  initForm() {
    this.userForm = this.fb.group({      

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
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      mobilenumber: ['',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.userAccountStrategy.PHONE_MIN_LENGTH),
          Validators.pattern(ValidationConstants.userAccountStrategy.PHONE_PATTERN)
        ],
      ],
    });
  }

  get firstName(): AbstractControl {
    return this.userForm.get('firstName') as FormControl;
  }
  get middleName(): AbstractControl {
    return this.userForm.get('middleName') as FormControl;
  }
  get lastName(): AbstractControl {
    return this.userForm.get('lastName') as FormControl;
  }
  get email(): AbstractControl {
    return this.userForm.get('email') as FormControl;
  }
  get mobilenumber(): AbstractControl {
    return this.userForm.get('mobilenumber') as FormControl;
  }

  updateUser() {
    console.log(this.userForm)
    const { value, invalid } = this.userForm;
    if (invalid) {
      for (const key in this.userForm.controls) {
        this.userForm.get(key)?.markAsTouched();
      }
      return;
    }

    const payload = {
      firstname: value.firstName,
      middlename: value.middleName,
      lastname: value.lastName,
      profileimagepath: this.url ? this.url : '',
      mobilenumber: value.mobilenumber
    }
    this.isLoading = true;
    this.accoutService.updateUser(payload).subscribe((res: any) => {
      if (res?.error) {
        this.snackbarServ.open(res?.message, this.ln.TXT_OK);

      } else {
        // update store
        this.store.dispatch(setUserMobile({ data: value.mobilenumber }));
        this.store.dispatch(setUserFullName({ data: `${value.firstName} ${value.middleName} ${value.lastName}` }))
        this.store.dispatch(setUserName({ data: { firstName: value.firstName, middleName: value.middleName, lastName: value.lastName } }));
        this.snackbarServ.open(this.ln.TXT_SUCCESSFULLY_ADDED, this.ln.TXT_OK);
        // this.userForm.reset();        
      }
      this.isLoading = false;
    }, (err) => this.isLoading = false)
  }


  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  public delete() {
    this.url = null;
  }

  resetHandler() {
    this.loadUser();
    // this.userForm.reset();
  }
}
