import { Component, OnInit } from '@angular/core';

// mat Dialog
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  edit: boolean = false;

  constructor(private dialogRef: MatDialogRef<UserDetailComponent>) { }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.position = { right: `0px` };
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
