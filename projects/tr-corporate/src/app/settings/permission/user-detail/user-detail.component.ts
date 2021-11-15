import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeAnimation } from '../../../animations';
import { ValidationConstants } from '../../../utility/configs/app.constants';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UpdateUser_request } from '../interfaces/update-user';
import { UserService } from '../services/user.service';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [fadeAnimation]
})
export class UserDetailComponent implements OnInit, OnChanges {

  editUserForm!: FormGroup;
  isLoading = false;

  options = [
    { name: '' },
    { name: '' },
    { name: '' }
  ];

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
