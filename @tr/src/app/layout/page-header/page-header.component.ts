import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tr-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goToPreviousPage() {
    this.location.back();
  }

}
