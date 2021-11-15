import { getRoles } from './../../../utility/store/selectors/roles.selector';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fadeAnimation } from '../../../animations';
import { State } from '../../../utility/store/reducers';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

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

  selectedData!: {
    sort: string,
    sortOrder: string,
    filter_roletypeid: number,
    filter_status: number
  };

  selectedSort!: string;
  selectedStatus!: number;
  selectedRole!: number;

  constructor(private store: Store<State>, public dialogRef: MatBottomSheetRef<MFilterComponent>) {

  }

  ngOnInit(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.role = roles;
    });
  }


  onfilter() {
    // this.dialogRef.afterDismissed({ 'sort': this.selectedSort, 'filter_roletypeid': this.selectedRole, 'filter_status': this.selectedStatus })
    this.dialogRef.dismiss()
  }

}
