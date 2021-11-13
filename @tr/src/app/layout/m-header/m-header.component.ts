import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ROUTE_CONFIGS } from 'projects/tr-corporate/src/app/utility/configs/routerConfig';



@Component({
  selector: 'tr-m-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.scss']
})
export class MHeaderComponent implements OnInit {
  panelOpenState = false;
  routerConfig = ROUTE_CONFIGS;

  @Output() logOutEvent = new EventEmitter<"">();

  constructor() { }

  ngOnInit(): void {
    
  }

  mLogOut() {
    this.logOutEvent.emit();    
  }

}
