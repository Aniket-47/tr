import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../../utility/configs/app.constants';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { AuthService } from '../services/auth.service';

// Interfaces

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isFirstStep: boolean = true;
  emailValidationError: string | null = null;
  passwordValidationError: string | null = null;
  email: string = "";
  isLoading: boolean = false;
  userNmae: string | null;
  userEmail: string | null;

  constructor(private authServ: AuthService, private lsServ: LstorageService, private router: Router) {
    this.userNmae = lsServ.getItem(LSkeys.USER_NAME);
    this.userEmail = lsServ.getItem(LSkeys.USER_EMAIL);
  }

  ngOnInit(): void {

    if (this.userEmail && this.userNmae)
      this.isEmailExists(this.userEmail);

  }

  isEmailExists(email: string) {
    this.email = email;
    this.isLoading = true;
    this.authServ.validateEmail(email).subscribe((res: any) => {
      if (res.statusCode == 400) {
        // on success
        this.isFirstStep = false;
        this.isLoading = false;
      }
      else {
        // manage error
        this.isLoading = false;
        this.emailValidationError = "Email does not exist"
      }
    },
      res_error => {
        const { error } = res_error;
        this.isLoading = false;
        this.emailValidationError = error.message;
      })
  }

  login(password: string) {
    this.isLoading = true;
    this.authServ.login({ "email": this.email, "password": password })
      .subscribe((res: any) => {
        console.log("Res ", res);
        // on success
        this.isLoading = false;
        this.lsServ.store(LSkeys.BREARER_TOKEN, res.data.accesstoken.token);
        this.router.navigate([ROUTE_CONFIGS.DASHBOARD]);
      },
        res_error => {
          console.log("Error ", res_error)
          const { error } = res_error;
          this.isLoading = false;
          this.passwordValidationError = error.message;
        })
  }

  changeAccount() {
    this.isFirstStep = true;

  }

}
