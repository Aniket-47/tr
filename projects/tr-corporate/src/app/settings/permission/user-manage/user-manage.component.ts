import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// ngrx
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/account.selector';

// Mat table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

// Mat modal
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

// Services
import { SnackBarService } from '../../../utility/services/snack-bar.service';
import { UserListService } from '../services/user-list.service';
import { UserService } from '../services/user.service';
import { MFilterComponent } from '../m-filter/m-filter.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  toggle = false;
  status = [
    { value: '0', viewValue: 'Deactive' },
    { value: '1', viewValue: 'Active' },
    { value: '2', viewValue: 'Pending' }
  ];
  role = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'Super Admin' }
  ];

  selectedStatus = this.status[0].value;
  selectedRole = this.role[0].value;
  displayedColumns: string[] = ['check', 'name', 'email', 'role', 'status', 'lastupdated', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  addUserModalRef!: MatDialogRef<AddUserComponent>;

  totalUsers!: number;

  currentUser!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  @ViewChild('modalRefElement', { static: false }) modalRefElement!: ElementRef;

  constructor(private userlistServ: UserListService, private userServ: UserService, private store: Store<State>, public dialog: MatDialog, private snackBar: SnackBarService, private _bottomSheet: MatBottomSheet) {
    this.totalUsers = 0;
    // this.store.select(getDefaultAccountId)
    //   .subscribe(accountid => {
    //     if (accountid) {
    //       this.userlistServ.getUserList(accountid).subscribe(res => {
    //         // console.log(res);
    //         this.dataSource = new MatTableDataSource(res.data.userslist)
    //         this.dataSource.paginator = this.paginator;

    //         // set this to total users from api
    //         this.totalUsers = res.data.totalcount;
    //       });
    //     }
    //   })
  }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(MFilterComponent);
  }
  ngAfterViewInit(): void {
    this.store.select(getDefaultAccountId).subscribe((accountid: any) => {
      if (accountid) this.loadUsers(accountid);
    });
  }

  toggleFab() {
    this.toggle = !this.toggle;
  }

  addUserModal() {
    this.addUserModalRef = this.dialog.open(AddUserComponent, {
      autoFocus: false, panelClass: 'modal'
    })
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  loadUsers(accountid: string) {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.userlistServ.getUserList(
            accountid,
            this.sort.active,
            this.paginator.pageIndex + 1,
            this.sort.direction == "desc" ? "desc" : "asc");
        }),
        map((res: any) => {
          // Flip flag to show that loading has finished.
          this.totalUsers = res?.data.totalcount;
          return res?.data.userslist;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((data: any) => this.dataSource = new MatTableDataSource(data));
  }

  viewUser(userData: any) {
    this.currentUser = userData;
  }


  deactivateUser(userID: string) {
    // console.log(userID);

    this.userServ.deactivateUser({ 'userID': userID }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }
  deleteUser(userID: string) {
    this.userServ.deleteUser({ 'userID': userID }).subscribe(res => {
      if (res.error) {
        // error from api
        this.snackBar.open(res.message);
      }
      else {
        // success from api
        this.snackBar.open(res.message);
      }
    })
  }


}
