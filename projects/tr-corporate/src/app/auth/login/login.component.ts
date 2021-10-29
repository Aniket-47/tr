import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Interfaces
import { EmailValidation_response } from './../interfaces/email-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isFirstStep: boolean = true;
  emailValidationError: string | null = null;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }

  isEmailExists(email: string) {
    this.authServ.validateEmail(email).subscribe((res: EmailValidation_response) => {
      if (res.status) {
        this.isFirstStep = false;
      }
    })
  }

  login() {

  }


}
