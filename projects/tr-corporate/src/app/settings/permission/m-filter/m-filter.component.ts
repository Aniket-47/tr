import { getRoles } from './../../../utility/store/selectors/roles.selector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { State } from '../../../utility/store/reducers';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-m-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  animations: [fadeAnimation]
})
export class MFilterComponent implements OnInit {

  sortTypes = [
    { value: 'status', viewValue: 'Sort by Status' },
    { value: 'roletypeid', viewValue: 'Sort by Role' }
  ];
  status = [
    { value: '', viewValue: 'All' },
    { value: '0', viewValue: 'Deactive' },
    { value: '1', viewValue: 'Active' },
    { value: '2', viewValue: 'Pending' }
  ];
  role!: any[];

  selectedData!: {
    sort: string,
    sortOrder: string,
    filter_roletypeid: number,
    filter_status: number
  };

  selectedSort!: string;
  selectedStatus!: number;
  selectedRole!: number;

  constructor(private store: Store<State>, public dialogRef: MatBottomSheetRef<MFilterComponent>, public filterserv: FilterService) {

  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.role = roles;

    });
  }


  onfilter() {
    this.filterserv.SelectedRole = this.selectedRole;
    this.filterserv.SelectedSort = this.selectedSort;
    this.filterserv.SelectedStatus = this.selectedStatus;
    // this.dialogRef.afterDismissed({ 'sort': this.selectedSort, 'filter_roletypeid': this.selectedRole, 'filter_status': this.selectedStatus })
    this.dialogRef.dismiss()
  }

}
