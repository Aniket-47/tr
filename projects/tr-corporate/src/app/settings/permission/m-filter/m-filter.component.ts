import { getRoles } from './../../../utility/store/selectors/roles.selector';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { State } from '../../../utility/store/reducers';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FilterService } from '../shared/services/filter.service';

@Component({
  selector: 'app-m-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  animations: [fadeAnimation]
})
export class MFilterComponent implements OnInit {
  // Filter data
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


  // Applied filter data
  selectedSort!: string;
  selectedStatus!: number;
  selectedRole!: number;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private store: Store<State>,
    public bottomsheetRef: MatBottomSheetRef<MFilterComponent>,
    public filterserv: FilterService) {
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => this.role = [{ roletypeid: '', name: 'All' }, ...roles]);

    if (this.data) {
      if (this.data.sort) this.selectedSort = this.data.sort;
      if (this.data.filter_roletypeid) this.selectedRole = this.data.filter_roletypeid;
      if (this.data.filter_status) this.selectedStatus = this.data.filter_status;
    }
  }

  dismiss(fallbckData: any = null) {
    this.bottomsheetRef.dismiss(fallbckData);
  }

  onfilter() {
    // this.filterserv.SelectedRole = this.selectedRole;
    // this.filterserv.SelectedSort = this.selectedSort;
    // this.filterserv.SelectedStatus = this.selectedStatus;
    // this.bottomsheetRef.afterDismissed({ 'sort': this.selectedSort, 'filter_roletypeid': this.selectedRole, 'filter_status': this.selectedStatus })
    const filterData = { 'sort': this.selectedSort, 'filter_roletypeid': this.selectedRole, 'filter_status': this.selectedStatus }
    this.dismiss(filterData)
  }

  onReset() {
    const filterData = { sort: null, filter_roletypeid: null, filter_status: null }
    this.dismiss(filterData);
  }

}
