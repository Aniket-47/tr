import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { LSkeys } from '../utility/configs/app.constants';
import { setUserAccounts } from '../utility/store/actions/user.action';
import { Iuser } from '../utility/store/interfaces/user';
import { AccountListApiService } from './services/account-list-api.service';
import { LogoutService } from './services/logout.service';


@Component({
  selector: 'app-dashabord',
  templateUrl: './dashabord.component.html',
  styleUrls: ['./dashabord.component.scss']
})
export class DashabordComponent implements OnInit {

  panelOpenState = false;
  date: any;
  hidden = false;
  colorActivation = false;
  msgColorActivation = false;
  searchToggle = false;
  resMsgLogout:string = "";

  accountList: [{ accountid: string; name: string; }] | null = null;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(
    private accountListApiServ: AccountListApiService, 
    private logoutServ: LogoutService, 
    private lsServ: LstorageService, 
    private store: Store<Iuser>,
    private router: Router) { }

  ngOnInit(): void {
    this.date = new Date();

    this.accountListApiServ.getAccountList().subscribe(res => {
      if (!res.error) {
        this.accountList = res.data;
        this.store.dispatch(setUserAccounts({data: this.accountList}))
      }
    });

  }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }

  logout() {
    this.resMsgLogout = "";
    this.logoutServ.logout().subscribe(res =>{
        this.lsServ.remove(LSkeys.BEARER_TOKEN);
        this.router.navigate(["./"]);
    })
  }
  onEvent(event: any) {
    event.stopPropagation();
 }
}
