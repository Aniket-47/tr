import { Store } from '@ngrx/store';
import { AddUser_request } from '../shared/interfaces/add-user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValidationConstants } from '../../../utility/configs/app.constants';
import { UserService } from '../shared/services/user.service';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { fadeAnimation } from '../../../animations';
import { MatDialogRef } from '@angular/material/dialog';
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';
import { getRoles } from '../../../utility/store/selectors/roles.selector';
import { SETTINGS_LN } from '../../shared/settings.lang';


export interface User {
  name: string;
}

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  animations: [fadeAnimation]
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;
  newUser!: any;
  isLoading = false;

  ln = SETTINGS_LN;

  constructor(private fb: FormBuilder, private userServ: UserService, private snackBar: SnackBarService, public dialogRef: MatDialogRef<AddUserComponent>, private store: Store<State>) { }

  // selecter
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Designation' },
    { value: 'pizza-1', viewValue: 'Admin' },
    { value: 'tacos-2', viewValue: 'Practice' }
  ];


  // autocompleet
  myControl = new FormControl();
  options: User[] = [
    { name: '' },
    { name: '' },
    { name: '' }
  ];
  filteredOptions: Observable<User[]> | undefined;
  accountID!: string;
  roles!: any[];

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: any) => name ? this._filter(name) : this.options.slice())
      );
    this.initForm();
    this.store.select(getDefaultAccountId)
      .subscribe(accountid => {
        this.accountID = accountid;
      });
    this.store.select(getRoles).subscribe(roles => {
      this.roles = roles;
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  initForm() {
    this.addUserForm = this.fb.group({
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
      roletypeid: ['', [Validators.required]],
      designationname: [''],
      businessverticalid: ['', [Validators.required]],
      practicename: [''],
      mobilenumber: [''],
      locationname: ['']
    });
  }

  get firstname(): AbstractControl {
    return this.addUserForm.get('firstname') as FormControl;
  }
  get middlename(): AbstractControl {
    return this.addUserForm.get('middlename') as FormControl;
  }
  get lastname(): AbstractControl {
    return this.addUserForm.get('lastname') as FormControl;
  }
  get email(): AbstractControl {
    return this.addUserForm.get('email') as FormControl;
  }
  get roletypeid(): AbstractControl {
    return this.addUserForm.get('roletypeid') as FormControl;
  }
  get designationname(): AbstractControl {
    return this.addUserForm.get('designationname') as FormControl;
  }
  get businessverticalid(): AbstractControl {
    return this.addUserForm.get('businessverticalid') as FormControl;
  }
  get practicename(): AbstractControl {
    return this.addUserForm.get('practicename') as FormControl;
  }
  get mobilenumber(): AbstractControl {
    return this.addUserForm.get('mobilenumber') as FormControl;
  }
  get locationname(): AbstractControl {
    return this.addUserForm.get('locationname') as FormControl;
  }

  addUser() {

    // const payload: AddUser_request = {
    //   firstname: this.firstName.value,
    //   middlename: this.middleName.value,
    //   lastname: this.lastName.value,
    //   email: this.email.value,
    //   roletypeid: this.userRole.value
    // }
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {
      this.isLoading = true;
      this.newUser = this.addUserForm.value;
      this.newUser.roletypename = this.roletypeid.value.name;
      this.newUser.roletypeid = this.roletypeid.value.roletypeid;
      // console.log(this.newUser);

      this.userServ.createUser(this.accountID, this.newUser).subscribe(res => {
        this.isLoading = false;
        if (res.error) {
          // error from api
          this.snackBar.open(res.message);
        }
        else {
          // success from api
          this.snackBar.open(res.message);
          setTimeout(() => {
            this.dialogRef.close();
            this.addUserForm.reset();
          }, 4000)
        }

      })
    }
  }




}
