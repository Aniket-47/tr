import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../../../animations';

@Component({
  selector: 'app-m-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  animations: [fadeAnimation]
})
export class MFilterComponent implements OnInit {

  typesOfShoes: string[] = ['Sort by Name', 'Sort by Status', 'Sort by Role'];
  typesOfShoes1: string[] = ['Admin', 'Super Admin', 'Relationship Manager'];
  typesOfShoes2: string[] = ['All', 'Active', 'Deactivated'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
