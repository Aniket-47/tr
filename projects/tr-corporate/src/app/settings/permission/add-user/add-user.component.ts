import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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
    { name: 'Mary' },
    { name: 'Shelley' },
    { name: 'Igor' }
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

    });
  }




}
