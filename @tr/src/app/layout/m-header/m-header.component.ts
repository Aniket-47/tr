import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'tr-m-header',
  templateUrl: './m-header.component.html',
  styleUrls: ['./m-header.component.scss']
})
export class MHeaderComponent implements OnInit {
  panelOpenState = false;

  @Output() logOutEvent = new EventEmitter<"">();

  constructor() { }

  ngOnInit(): void {
  }

  mLogOut() {
    this.logOutEvent.emit();    
  }

}
