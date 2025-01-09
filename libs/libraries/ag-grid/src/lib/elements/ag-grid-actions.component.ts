import { Component} from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
@Component({
  template: `
  <ng-container *ngFor="let menu of params.menu">
    <span class="cursor-pointer me-1" >
    <span>
      <img class="cursor-pointer" src="{{ menu.image }}" matTooltip="{{ menu.tooltip }}"  matTooltipPosition="right"  width="14" (click)="menu.onMenuAction(params.data)" >
    </span>&nbsp;&nbsp;
    </span>
  </ng-container>`,
  styles: ['.mat-menu-item { line-height: 30px;height: 30px;}.cursor-pointer{cursor: pointer;}']
})

export class AgGridActionComponent implements AgRendererComponent {
  params: any;
  refresh(params: any): boolean {
   return false
  }
 agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params = params;
  }
}
