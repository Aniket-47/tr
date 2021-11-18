import { Component, OnInit } from '@angular/core';
import { ROUTE_CONFIGS } from 'projects/tr-corporate/src/app/utility/configs/routerConfig';

import { fadeAnimation } from '../animations';
import { ACCOUNT_LN } from './shared/account.lang';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeAnimation]
})
export class AccountComponent implements OnInit {

  routerConfig = ROUTE_CONFIGS;

  ln = ACCOUNT_LN;

  constructor() { }

  ngOnInit(): void {
  }

}
