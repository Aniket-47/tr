import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userRoles } from '../../utility/configs/app.constants';
import { Iuser } from '../../utility/store/interfaces/user';
import { State } from '../../utility/store/reducers';
import { getDefaultAccountId } from '../../utility/store/selectors/user.selector';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  url: any;
  userForm!: FormGroup;
  roles = userRoles;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private accoutService: AccountService,) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUser();
  }

  getUser() {
    this.accoutService.getUser().subscribe((res: any) => {
      if (res && res?.data) {
        const user = res.data;
        this.userForm.patchValue({
          firstName: user?.firstname,
          middleName: user?.middlename,
          lastName: user?.lastname,
        });
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: [''],
      accType: [],
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

  updateUser() {
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
      lastname: value.lastname,
      profileimagepath: this.url ? this.url : ''
    }
    this.isLoading = true;
    this.accoutService.updateUser(payload).subscribe(res => {
      console.log(res);
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
}
