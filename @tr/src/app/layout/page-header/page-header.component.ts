import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tr-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() showBackBtn: boolean = true;
  @Input() backUrl: string = '../'

  constructor(private router: Router) { }

  ngOnInit(): void { }

  goToPreviousPage() {
    this.router.navigateByUrl(this.backUrl)
  }

}
