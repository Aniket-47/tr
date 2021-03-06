import { getBusinessVerticle } from './../../../utility/store/selectors/business-vertical.selector';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() userAdded = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private userServ: UserService,
    private snackBar: SnackBarService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private store: Store<State>,) { }

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
  businessverticals!: any[];

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
    this.store.select(getBusinessVerticle).subscribe(businessverticals => {
      this.businessverticals = businessverticals;
    })
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
          Validators.pattern(ValidationConstants.userEmailStrategy.EMAIL_PATTERN)
        ]
      ],
      roletypeid: ['', [Validators.required]],
      designationname: [''],
      businessverticalid: ['', [Validators.required]],
      practicename: [''],
      mobilenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(ValidationConstants.userAccountStrategy.PHONE_MIN_LENGTH),
          Validators.pattern(ValidationConstants.userAccountStrategy.PHONE_PATTERN)
        ],
      ],
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
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {
      this.isLoading = true;
      this.newUser = this.addUserForm.value;
      this.newUser.roletypename = this.roletypeid.value.name;
      this.newUser.roletypeid = this.roletypeid.value.roletypeid;

      this.userServ.createUser(this.newUser).subscribe(res => {
        this.isLoading = false;
        if (res.error) {
          // error from api
          this.snackBar.open(res.message);
        }
        else {
          // success from api
          this.snackBar.open(res.message);
          setTimeout(() => {
            this.dialogRef.close({ added: true });
            this.addUserForm.reset();
          }, 2000)
        }
      });
    }
  }




}
