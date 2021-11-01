import {Component} from '@angular/core';

@Component({
    selector: '',
    template: `
        <div class="my-5">
            <mc-message-box>
                <i class="icon-mcf mcf-check_circle_outline icon" msg-icon></i>
                <p msg-title class="title">Congratulations</p>
                <p msg-sub-title class="sub-title">
                    Your account has been sucessfully created with Talent Recruit. Please
                    verify your email by clicking on the verify button
                </p>
                <button msg-action mat-flat-button color="primary" routerLink="/auth/login">login</button>
            </mc-message-box>    
        </div>
    `,
    styles: [
        `
            .icon::before{
                color: rgb(13, 216, 13);
            }
        `
    ]
})

export class RegisterSuccessComponent {
    constructor() {}
}