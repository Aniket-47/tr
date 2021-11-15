import { getRoles } from './../../../utility/store/selectors/roles.selector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { State } from '../../../utility/store/reducers';

@Component({
  selector: 'app-m-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  animations: [fadeAnimation]
})
export class MFilterComponent implements OnInit {

  sortTypes: string[] = ['Sort by Status', 'Sort by Role'];
  status = [
    { value: '0', viewValue: 'Deactive' },
    { value: '1', viewValue: 'Active' },
    { value: '2', viewValue: 'Pending' }
  ];
  role!: any[];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.role = roles;
    });
  }

}
