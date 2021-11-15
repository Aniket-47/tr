import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeAnimation]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
