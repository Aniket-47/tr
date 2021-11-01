import { Component, OnInit } from '@angular/core';
import { AccountListApiService } from './services/account-list-api.service';

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

  accountList: [{ accountid: string; name: string; }] | null = null;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(private accountListApiServ: AccountListApiService) { }

  ngOnInit(): void {
    this.date = new Date();

    this.accountListApiServ.getAccountList().subscribe(res => {
      if (!res.error) {
        this.accountList = res.data;
      }
    });

  }

  toggleSearch() {
    this.searchToggle = !this.searchToggle;
  }

  onEvent(event: any) {
    event.stopPropagation();
 }
}
