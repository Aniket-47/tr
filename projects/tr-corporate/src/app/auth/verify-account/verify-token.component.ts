import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_CONFIGS } from '../../utility/configs/routerConfig';
import { AuthService } from '../services/auth.service';

@Component({
    selector: '',
    template: `
    <div class="message-wrap">
        <mc-message-box>
           <div class="lds-ellipsis" *ngIf="isLoading" msg-icon><div></div><div></div><div></div><div></div></div>
 
        <svg version="1.1" *ngIf="!isLoading && isVerified" msg-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
           <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
           <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>

           <svg *ngIf="!isLoading && !isVerified" msg-icon version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
            </svg>
           <p msg-title class="title">{{message}}</p>
        </mc-message-box>    
    </div>
    `,
    styles:[
        `
            .message-wrap{
                width: 400px;
                max-width: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            
            .lds-ellipsis {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
              }
              .lds-ellipsis div {
                position: absolute;
                top: 33px;
                width: 13px;
                height: 13px;
                border-radius: 50%;
                background: rgb(13, 216, 13);
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
              }
              .lds-ellipsis div:nth-child(1) {
                left: 8px;
                animation: lds-ellipsis1 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(2) {
                left: 8px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(3) {
                left: 32px;
                animation: lds-ellipsis2 0.6s infinite;
              }
              .lds-ellipsis div:nth-child(4) {
                left: 56px;
                animation: lds-ellipsis3 0.6s infinite;
              }
              @keyframes lds-ellipsis1 {
                0% {
                  transform: scale(0);
                }
                100% {
                  transform: scale(1);
                }
              }
              @keyframes lds-ellipsis3 {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0);
                }
              }
              @keyframes lds-ellipsis2 {
                0% {
                  transform: translate(0, 0);
                }
                100% {
                  transform: translate(24px, 0);
                }
              }

              ::ng-deep .mc-card{
                  border: none !important;
              }

              .icon::before{
                color: rgb(13, 216, 13);
              }

              .green::before{
                color: rgb(13, 216, 13);
              }
              .red::before{
                color: #EE4540;
              }

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
                &.line {
                  stroke-dashoffset: 1000;
                  -webkit-animation: dash .9s .35s ease-in-out forwards;
                  animation: dash .9s .35s ease-in-out forwards;
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
        `
    ]
})

export class VerifyAccountComponent implements OnInit{
    isLoading = false;
    message = 'Verifying your account';
    isVerified = false;
    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

    ngOnInit(): void{
        const token = this.route.snapshot.paramMap.get('token');
        if(token) {
            this.isLoading = true;
            this.authService.validateAccount(token).subscribe((res:any) => {
                this.isLoading = false;
                this.message = res.message;
                this.isVerified = true;
                this.afterVerify();
            }, (err) => {
                this.isLoading = false
                this.message = 'Account verification failed';
                this.isVerified = false;
                this.afterVerify()
            })
        }
    }

    afterVerify(){
        setTimeout(() => this.router.navigate([ROUTE_CONFIGS.LOGIN])
        , 3000)
    }
}