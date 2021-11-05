import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// ngrx
import { State } from '../../../utility/store/reducers';
import { getDefaultAccountId } from '../../../utility/store/selectors/user.selector';

// Mat table
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Mat modal
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { map } from 'rxjs/operators';

// Services
import { UserListService } from '../services/user-list.service';

const ELEMENT_DATA = [
  { img: './assets/img/user.jpg', name: 'Essie Ward', email: 'lu@sa.co.uk', role: 'Admin', username: 'Essic_Ward', status: 'Active', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Jennifer', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Jenne', status: 'Inactive', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },
  { img: './assets/img/user.jpg', name: 'Rocky Willam', email: 'lu@sa.co.uk', role: 'Super Admin', username: 'Rocky_w', status: 'Deactivated', lastupdated: '17 Apr 2021' },

];
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
  addUserModalRef!: MatDialogRef<AddUserComponent>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('modalRefElement', { static: false }) modalRefElement!: ElementRef;

  constructor(private userlistserv: UserListService, private store: Store<State>, public dialog: MatDialog) {
    this.store.select(getDefaultAccountId)
      .subscribe(s => {
        if (s.length > 0) {
          this.userlistserv.getUserList(s[0].accountid).subscribe(res => {
            console.log(res);
            this.dataSource = new MatTableDataSource(res.data)
            this.dataSource.paginator = this.paginator;
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
    this.addUserModalRef = this.dialog.open(AddUserComponent, { width: '50vw' })
  }


}
