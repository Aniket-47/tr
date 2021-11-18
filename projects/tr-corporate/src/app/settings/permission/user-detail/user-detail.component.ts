import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeAnimation } from '../../../animations';
import { ValidationConstants } from '../../../utility/configs/app.constants';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UpdateUser_request } from '../shared/interfaces/update-user';
import { UserService } from '../shared/services/user.service';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { Irole } from '../../../utility/store/interfaces/role';
import { getRoles } from '../../../utility/store/selectors/roles.selector';
import { SETTINGS_LN } from '../../shared/settings.lang';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [fadeAnimation]
})
export class UserDetailComponent implements OnInit, OnChanges {

  editUserForm!: FormGroup;
  isLoading = false;

  roles: Irole[] = [];

  @Input() edit: boolean = false;
  @Input() user = {
    fullname: "Aniket Das",
    email: "aniket.d@mucrest.com",
    roletypeid: "Super Admin",
    designation: "Developer",
    businessVertical: "lorem",
    practice: "Blah Blah",
    phone: "+918954467845",
    location: "Kolkata Park Street, Pin 700022"
  };
  accountID!: string;

  ln = SETTINGS_LN;

  constructor(private fb: FormBuilder, private userServ: UserService, private snackBar: SnackBarService, private store: Store<State>) {

  }

  initForm() {
    this.editUserForm = this.fb.group({
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
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      userRole: [''],
    });
  }

  get firstName(): AbstractControl {
    return this.editUserForm.get('firstName') as FormControl;
  }
  get middleName(): AbstractControl {
    return this.editUserForm.get('middleName') as FormControl;
  }
  get lastName(): AbstractControl {
    return this.editUserForm.get('lastName') as FormControl;
  }
  get email(): AbstractControl {
    return this.editUserForm.get('email') as FormControl;
  }
  get userRole(): AbstractControl {
    return this.editUserForm.get('userRole') as FormControl;
  }

  ngOnInit(): void {
    this.initForm();
    this.store.select(getDefaultAccountId)
      .subscribe(accountid => {
        this.accountID = accountid;
      });


    this.store.select(getRoles).subscribe(roles => {
      // remove owner, because for one account there is only one owner.
      if (roles && roles.length) this.roles = roles.slice(1, roles.length);
    })
  }

  ngOnChanges() {
    if (this.user)
      this.prefillUser();
  }

  prefillUser() {
    this.editUserForm.patchValue(
      {
        firstname: this.user.fullname,
        email: this.user.email,
        userRole: this.user.roletypeid
      }
    )
  }

  addUser() {
    this.isLoading = true;
    // const payload: UpdateUser_request = {
    //   firstname: this.firstName.value,
    //   middlename: this.middleName.value,
    //   lastname: this.lastName.value,
    //   email: this.email.value,
    //   roletypeid: this.userRole.value,
    //   accountroleid: this.userID
    // }
    if (this.editUserForm.valid) {
      this.userServ.createUser(this.accountID, this.editUserForm.value).subscribe(res => {
        this.isLoading = false;
        if (res.error) {
          // error from api
          this.snackBar.open(res.message);
        }
        else {
          // success from api
          this.snackBar.open(res.message);
          setTimeout(() => {
            this.editUserForm.reset();
          }, 4000)
        }
      })
    }
  }

}
