import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-m-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.scss']
})
export class MHeaderComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

  accountLists = [
    {
      account: 'Account 1'
    },
    {
      account: 'Account 2'
    },
    {
      account: 'Account 3'
    }
  ]

}
