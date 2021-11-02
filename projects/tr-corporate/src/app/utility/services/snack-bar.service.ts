import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }
  open(message: string, action?: string, duration: number = 4000, className?: string) {
    this.snackBar.open(message, action, { duration })
  }
}
