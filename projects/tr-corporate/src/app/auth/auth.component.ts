import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  leftPanelImg: string;
  constructor() {
    this.leftPanelImg = "assets/images/shu-Corporate-background-checks-man-ticking-boxes-130944260-1500x1000.jpg"
  }

  ngOnInit(): void {
  }

}
