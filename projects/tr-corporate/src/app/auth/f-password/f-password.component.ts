import { Component, OnInit} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-f-password',
  templateUrl: './f-password.component.html',
  styleUrls: ['./f-password.component.scss']
})
export class FPasswordComponent implements OnInit {

  resMessage: string="";
  isLoading = false;
  isError = false;

  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
  }
  

  emailFormControl=new FormControl('',[
    Validators.required,
    Validators.email
  ])

  fpassword() {
    this.resMessage = "";
    this.isLoading = true;
    this.emailFormControl.valid && this.authServ.passwordForget(this.emailFormControl.value)
      .subscribe((res: any) => {
        this.isLoading = false;
       
        this.isError = res.error==='true'?true:false;
        console.log(res);
        
      
        this.resMessage=res.message;        
      })
  }
}