import {Component, OnDestroy} from '@angular/core';
import { Store } from '@ngrx/store';
import { setStepper, setStepperShow } from '../store/actions/auth.action';
import { Iauth } from '../store/interface/auth';

@Component({
    selector: '',
    template: `
        <div class="message-wrap">
            <mc-message-box>
            <svg msg-icon version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
            <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
            </svg>
                <p msg-title class="title">Congratulations</p>
                <p msg-sub-title class="sub-title">
                    Your account has been sucessfully created with Talent Recruit. Please verify
                    your account by clicking on the verify button from your registered mail address.
                </p>
                <button msg-action mat-flat-button color="primary" routerLink="/auth/login">Back to Sign In</button>
            </mc-message-box>    
        </div>
    `,
    styles: [
        `
        svg {
            width: 100px;
            display: block;
            margin: 40px auto;
        }

        .path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
            &.circle {
              -webkit-animation: dash .9s ease-in-out;
              animation: dash .9s ease-in-out;
            }
            &.check {
              stroke-dashoffset: -100;
              -webkit-animation: dash-check .9s .35s ease-in-out forwards;
              animation: dash-check .9s .35s ease-in-out forwards;
            }
          }
          @-webkit-keyframes dash {
            0% {
              stroke-dashoffset: 1000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes dash {
            0% {
              stroke-dashoffset: 1000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @-webkit-keyframes dash-check {
            0% {
              stroke-dashoffset: -100;
            }
            100% {
              stroke-dashoffset: 900;
            }
          }
          
          @keyframes dash-check {
            0% {
              stroke-dashoffset: -100;
            }
            100% {
              stroke-dashoffset: 900;
            }
          }
            .message-wrap{
                width: 400px;
                max-width: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .icon::before{
                color: rgb(13, 216, 13);
            }
            ::ng-deep .mc-card{
                border: none !important;
            }
        `
    ]
})

export class RegisterSuccessComponent implements OnDestroy{
    constructor(private store: Store<Iauth>) {
      this.store.dispatch(setStepperShow({ data: true }));
      this.store.dispatch(setStepper({ data: 2 }));
    }

    ngOnDestroy(){
      this.store.dispatch(setStepperShow({ data: false }));
    }
}