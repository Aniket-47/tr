import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isEmailExists(email: string) {
    this.email = email;
    this.isLoading = true;
    this.authServ.validateEmail(email).subscribe((res: any) => {
      if (res.error) {
        // on success
        this.isFirstStep = false;
        this.isLoading = false;
      }
      else {
        // manage error
        this.isLoading = false;
        this.emailValidationError = "Email does not exist"
      }
    })
  }

  login(password: string) {
    this.isLoading = true;
    this.authServ.login({ "email": this.email, "password": password })
      .subscribe((res: any) => {
        // console.log(res);
        if (res.error) {
          // manage error
          this.isLoading = false;
          this.passwordValidationError = "Invalid Password"
        }
        else {
          // on success
          this.isLoading = false;
          this.router.navigate([ROUTE_CONFIGS.DASHBOARD]);
        }
      })
  }


}
