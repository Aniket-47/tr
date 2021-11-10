import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'tr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isActive = false;
  constructor() { }
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (this.isActive == true) {
      this.isActive = false;
    }
    
  }
  ngOnInit(): void {
  }
  foods: Food[] = [
    {value: '0', viewValue: 'Permission'},
    {value: '1', viewValue: 'Templates'},
    {value: '2', viewValue: 'Integration'},
    {value: '3', viewValue: 'Configuration'},
    {value: '4', viewValue: 'Billing'},
    {value: '5', viewValue: 'Candidate Portal'},
    {value: '6', viewValue: 'Vendor Portal'},
    {value: '7', viewValue: 'Employee Portal'},
  ];
  selected = '0';

  onKeypressEvent(event: any){
    event.stopPropagation();
    this.isActive = true;
 }
}
