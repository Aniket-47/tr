import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValidationConstants } from '../../../utility/configs/app.constants';


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
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup;

  constructor(private fb: FormBuilder,) { }

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

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: any) => name ? this._filter(name) : this.options.slice())
      );
    this.initForm();
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
    return this.addUserForm.get('firstName') as FormControl;
  }
  get middleName(): AbstractControl {
    return this.addUserForm.get('middleName') as FormControl;
  }
  get lastName(): AbstractControl {
    return this.addUserForm.get('lastName') as FormControl;
  }
  get email(): AbstractControl {
    return this.addUserForm.get('email') as FormControl;
  }
  get userRole(): AbstractControl {
    return this.addUserForm.get('userRole') as FormControl;
  }

  addUser() {

  }




}
