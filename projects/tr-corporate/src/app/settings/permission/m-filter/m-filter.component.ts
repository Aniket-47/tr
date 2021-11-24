import { getRoles } from './../../../utility/store/selectors/roles.selector';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { State } from '../../../utility/store/reducers';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FilterService } from '../shared/services/filter.service';
import { SETTINGS_LN } from '../../shared/settings.lang';

@Component({
  selector: 'app-m-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  animations: [fadeAnimation]
})
export class MFilterComponent implements OnInit {

  ln = SETTINGS_LN;

  // Filter data
  sortTypes = [
    { value: 'lastupdated', viewValue: this.ln.TXT_LAST_UPDATED},
    { value: 'status', viewValue: this.ln.TXT_STATUS},
    { value: 'roletypeid', viewValue: this.ln.TXT_ROLE }
  ];
  status = [
    { value: '', viewValue: this.ln.TXT_ALL },
    { value: '0', viewValue: this.ln.TXT_DEACTIVE },
    { value: '1', viewValue: this.ln.TXT_ACTIVE },
    { value: '2', viewValue: this.ln.TXT_PENDING }
  ];
  role!: any[];


  // Applied filter data
  selectedStatus!: number;
  selectedRole!: number;
  selectedSort = "lastupdated";


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private store: Store<State>,
    public bottomsheetRef: MatBottomSheetRef<MFilterComponent>,
    public filterserv: FilterService) {
  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => this.role = [{ roletypeid: '', name: this.ln.TXT_ALL }, ...roles]);

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
    // console.log(filterData);
    this.dismiss(filterData)
  }

  onReset() {
    const filterData = { sort: null, filter_roletypeid: null, filter_status: null }
    this.dismiss(filterData);
  }

}
