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

}
