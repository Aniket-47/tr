import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationConstants } from '../../../utility/configs/app.constants';
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UpdateUser_request } from '../interfaces/update-user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  edit: boolean = false;
  editUserForm!: FormGroup;
  isLoading = false;

  user!: any;

  options = [
    { name: '' },
    { name: '' },
    { name: '' }
  ];

  @Input() userID!: string;

  constructor(private fb: FormBuilder, private userServ: UserService, private snackBar: SnackBarService) {
    // dummy data, change to user/get api

    // Delete this
    this.user = {
      firstname: "Aniket",
      middlename: "",
      lastname: "Das",
      email: "aniket.d@mucrest.com",
      roletypeid: "Super Admin",
      designation: "Developer",
      businessVertical: "lorem",
      practice: "Blah Blah",
      phone: "+918954467845",
      location: "Kolkata Park Street, Pin 700022"
    }


    // Enable this

    // this.userServ.getUser({ 'userID': this.userID }).subscribe(res => {
    //   if(res.error){
    //     // handel error
    //   }
    //   else{
    //     this.user=res.data;
    //   }
    // })
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
      this.userServ.createUser(this.editUserForm.value).subscribe(res => {
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
