import { getBusinessVerticle } from './../../../utility/store/selectors/business-vertical.selector';
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
import { GetUser_response } from './../shared/interfaces/get-user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [fadeAnimation]
})
export class UserDetailComponent implements OnInit, OnChanges {

  editUserForm!: FormGroup;
  newUser!: any;
  isLoading = false;

  roles: Irole[] = [];
  businessverticals!: any[];



  @Input() edit: boolean = false;
  @Input() userEmail!: string;


  user!: GetUser_response["data"] | null;
  accountID!: string;

  ln = SETTINGS_LN;

  constructor(private fb: FormBuilder, private userServ: UserService, private snackBar: SnackBarService, private store: Store<State>) {

  }

  initForm() {
    this.editUserForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.userAccountStrategy.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.userAccountStrategy.NAME_MAX_LENGTH)
        ],
      ],
      middlename: [
        '',
        [
          Validators.minLength(ValidationConstants.userAccountStrategy.NAME_MIN_LENGTH),
          Validators.maxLength(ValidationConstants.userAccountStrategy.NAME_MAX_LENGTH)
        ],
      ],
      lastname: [
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
      roletypeid: [''],
      designationname: [''],
      businessverticalid: [''],
      practicename: [''],
      mobilenumber: [''],
      locationname: ['']
    });
  }

  get firstname(): AbstractControl {
    return this.editUserForm.get('firstname') as FormControl;
  }
  get middlename(): AbstractControl {
    return this.editUserForm.get('middlename') as FormControl;
  }
  get lastname(): AbstractControl {
    return this.editUserForm.get('lastname') as FormControl;
  }
  get email(): AbstractControl {
    return this.editUserForm.get('email') as FormControl;
  }
  get roletypeid(): AbstractControl {
    return this.editUserForm.get('roletypeid') as FormControl;
  }
  get designationname(): AbstractControl {
    return this.editUserForm.get('designationname') as FormControl;
  }
  get businessverticalid(): AbstractControl {
    return this.editUserForm.get('businessverticalid') as FormControl;
  }
  get practicename(): AbstractControl {
    return this.editUserForm.get('practicename') as FormControl;
  }
  get mobilenumber(): AbstractControl {
    return this.editUserForm.get('mobilenumber') as FormControl;
  }
  get locationname(): AbstractControl {
    return this.editUserForm.get('locationname') as FormControl;
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
    this.store.select(getBusinessVerticle).subscribe(businessverticals => {
      this.businessverticals = businessverticals;
    })
  }

  ngOnChanges() {
    this.user = null
    this.initForm();
    if (this.userEmail)
      this.prefillUser();
  }

  prefillUser() {
    // this.editUserForm.patchValue(
    //   {
    //     firstname: this.user.fullname,
    //     email: this.user.email,
    //     userRole: this.user.roletypeid
    //   }
    // )

    this.userServ.getUser(this.userEmail).subscribe(res => {
      if (!res.error) {
        this.user = res.data;
        this.editUserForm.patchValue(res.data);

      }
    })
  }

  editUser() {
    this.isLoading = true;
    // const payload: UpdateUser_request = {
    //   firstname: this.firstName.value,
    //   middlename: this.middleName.value,
    //   lastname: this.lastName.value,
    //   email: this.email.value,
    //   roletypeid: this.userRole.value,
    //   accountroleid: this.userID
    // }
    this.editUserForm.markAllAsTouched();
    if (this.editUserForm.valid) {
      this.isLoading = true;
      this.newUser = this.editUserForm.value;
      this.newUser.roletypename = this.roles.find(e => e.roletypeid == this.newUser.roletypeid)?.name;
      // console.log(this.newUser);

      this.userServ.updateUser(this.newUser).subscribe(res => {
        this.isLoading = false;
        if (res.error) {
          // error from api
          this.snackBar.open(res.message);
        }
        else {
          // success from api
          this.snackBar.open(res.message);
        }

      })
    }
  }



}
