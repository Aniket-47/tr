import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userRoles } from '../../utility/configs/app.constants';
import { Iuser } from '../../utility/store/interfaces/user';
import { State } from '../../utility/store/reducers';
import { getDefaultAccountId } from '../../utility/store/selectors/user.selector';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  url: any;
  userForm!: FormGroup;
  roles = userRoles;
  accountId!: string;
  constructor(
    private fb: FormBuilder,
    private store: Store<State>) { 
      this.store.select(getDefaultAccountId).subscribe(data => this.accountId = data[0]?.accountid);
    
  }

  ngOnInit(): void {
    this
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      accType: [1, [Validators.required]],
    });
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
  public delete(){
    this.url = null;
  }
}
