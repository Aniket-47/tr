import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashabord',
  templateUrl: './dashabord.component.html',
  styleUrls: ['./dashabord.component.scss']
})
export class DashabordComponent implements OnInit {

  date: any;
  hidden = false;
  colorActivation?:boolean=false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor() { }

  ngOnInit(): void {
    this.date = new Date()
  }

  // activeColor() {
  //   this.colorActivation = true;
  //   console.log(this.colorActivation);       
  // }

}
