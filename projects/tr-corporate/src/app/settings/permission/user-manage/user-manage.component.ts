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

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  toggle = false;
  status = [
    { value: '0', viewValue: 'Active' },
    { value: '1', viewValue: 'Inactive' },
    { value: '2', viewValue: 'Pending' }
  ];
  role = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'Super Admin' }
  ];
  sort = [
    { value: '0', viewValue: 'Shot By: Added to Jobs' },
    { value: '1', viewValue: 'Shot By: Added to Jobs' },
    { value: '2', viewValue: 'Shot By: Added to Jobs' }
  ];
  selectedStatus = this.status[0].value;
  selectedRole = this.role[0].value;
  selectedSort = this.sort[0].value;
  displayedColumns: string[] = ['check', 'name', 'role', 'email', 'status', 'lastupdated', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  addUserModalRef!: MatDialogRef<AddUserComponent>;

  totalUsers!: number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('modalRefElement', { static: false }) modalRefElement!: ElementRef;

  constructor(private userlistServ: UserListService, private userServ: UserService, private store: Store<State>, public dialog: MatDialog, private snackBar: SnackBarService) {
    this.totalUsers = 0;
    this.store.select(getDefaultAccountId)
      .subscribe(accountid => {
        if (accountid) {
          this.userlistServ.getUserList(accountid).subscribe(res => {
            // console.log(res);
            this.dataSource = new MatTableDataSource(res.data.userslist)
            this.dataSource.paginator = this.paginator;

            // set this to total users from api
            this.totalUsers = res.data.userslist.length;
          });
        }
      })
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
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
