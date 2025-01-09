import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromptComponent } from './prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private dialogRef: MatDialogRef<any> | null = null;
  constructor(private _dialog: MatDialog) {}

  openDialog(config: any, closeCallback: any) {
    if (this.dialogRef) {
      return;
    }

    this.dialogRef = this._dialog.open(PromptComponent, {
      panelClass: 'logOut-dialog-container',
      width: config.width ? config.width : '350px',
      data: config
    });

    this.dialogRef.afterClosed().subscribe((result:any) => {
      this.dialogRef = null;
      if (result) {
        closeCallback(result);
      }
    });
  }
}
