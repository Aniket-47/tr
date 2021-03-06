import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../../utility/configs/app.constants';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { setUserLoginStatus } from '../../utility/store/actions/user.action';
import { State } from '../../utility/store/reducers';
import { AuthService } from '../services/auth.service';
import { fadeAnimation } from '../../animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})

export class LoginComponent implements OnInit {
  isFirstStep: boolean = true;
  emailValidationError: string | null = null;
  passwordValidationError: string | null = null;
  email: string = "";
  isLoading: boolean = false;
  userName: string | null;
  userEmail: string | null;

  constructor(
    private authServ: AuthService,
    private lsServ: LstorageService,
    private store: Store<State>,
    private router: Router) {
    this.userName = lsServ.getItem(LSkeys.USER_NAME);
    this.userEmail = lsServ.getItem(LSkeys.USER_EMAIL);
  }

  ngOnInit(): void {
    if (this.userEmail && this.userName) this.isEmailExists(this.userEmail);
  }

  isEmailExists(email: string) {
    this.email = email;
    this.isLoading = true;
    this.emailValidationError = null;
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
      });
  }

  login(password: string) {
    this.isLoading = true;
    this.passwordValidationError = null;
    this.authServ.login({ "email": this.email, "password": password })
      .subscribe((res: any) => {
        // on success
        this.isLoading = false;
        this.lsServ.store(LSkeys.BEARER_TOKEN, res.data.accesstoken.token);
        this.store.dispatch(setUserLoginStatus({ data: true }));
        if (this.lsServ.getItem(LSkeys.REGISTERED_EMAIL) == this.email) {
          this.router.navigate([ROUTE_CONFIGS.ACCOUNT_MANAGE_PROFILE]);
          this.lsServ.remove(LSkeys.REGISTERED_EMAIL)
        }
        else
          this.router.navigate([ROUTE_CONFIGS.DASHBOARD]);
        this.lsServ.store(LSkeys.USER_EMAIL, this.email);
      },
        res_error => {
          const { error } = res_error;
          this.isLoading = false;
          this.passwordValidationError = error.message;
        });
  }

  changeAccount() {
    this.isFirstStep = true;
    this.userEmail = null;
    this.userName = null;
    this.lsServ.remove(LSkeys.USER_NAME);
    this.lsServ.remove(LSkeys.USER_EMAIL);
  }

}
