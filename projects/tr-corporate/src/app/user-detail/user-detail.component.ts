import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [fadeAnimation]
})
export class UserDetailComponent implements OnInit {

  edit:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
