import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from 'projects/tr-corporate/src/app/utility/configs/routerConfig';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  routerConfig = ROUTE_CONFIGS;

  constructor() { }

  ngOnInit(): void {
  }

}
