import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { STATUS_BUTTON, STATUS_COLOR } from '../../_utils/grid.config';

@Component({
  selector: 'app-custom-status-cell-renderer',
  templateUrl: './custom-status-cell-renderer.component.html',
  styleUrls: ['./custom-status-cell-renderer.component.scss']
})
export class CustomStatusCellRendererComponent implements AgRendererComponent {
  params: any;
  backgroundColor:string = '';
  color = 'black';
  text = '';
  STATUS_COLOR = STATUS_COLOR;
  constructor() { }



  refresh(params: any): boolean {
    return true
  }
  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params = params;
    if (this.params?.value) {

      this.backgroundColor = STATUS_COLOR[(this.params?.value).toUpperCase()] ? STATUS_COLOR[(this.params?.value).toUpperCase()] : '';

      this.text = this.customFormat(this.params?.value);

      if (STATUS_COLOR[(this.params?.value).toUpperCase()]) {
        this.color = 'white'
      }
    }
  }
  customFormat(value:any) {
    if(value===true||value===false){

      if(value===true)
      {
        let text='In Active';
        return text
      }
      if(value===false){
          let text='Active'
          return text
      }

    }
    else{
      let text = value.charAt(0) + value.slice(1).toLowerCase();
    return text.split('_').join(' ')

    }
  }

  colorButton(params:any) {
    let classname;
    if(params){
    let val = params?.data?.activeStatus || params?.data?.scheduleStatus ||params?.data?.status|| params?.data?.stage||params?.data?.accountStatus
    // || params?.value
    let className = '';
    let value =(val?.replaceAll(" ","_"))?.replaceAll("-","_")?.toUpperCase();
    switch (value) {
      case STATUS_BUTTON.active.value:
        className = STATUS_BUTTON.active.className;
        break;
      case STATUS_BUTTON.inactive.value:
        className = STATUS_BUTTON.inactive.className;
        break;
      case STATUS_BUTTON.true.value:
        className = STATUS_BUTTON.true.className;
        break;
      case STATUS_BUTTON.false.value:
          className = STATUS_BUTTON.false.className;
          break;
      case STATUS_BUTTON.draft.value:
          className = STATUS_BUTTON.draft.className;
        break;
      case STATUS_BUTTON.inprogress.value:
          className = STATUS_BUTTON.inprogress.className;
        break;
      case STATUS_BUTTON.reassigned.value:
          className = STATUS_BUTTON.reassigned.className;
        break;
      case STATUS_BUTTON.approved.value:
          className = STATUS_BUTTON.approved.className;
        break;
      case STATUS_BUTTON.initiated.value:
          className = STATUS_BUTTON.initiated.className;
        break;
      case STATUS_BUTTON.rejected.value:
          className = STATUS_BUTTON.rejected.className;
        break;
      case STATUS_BUTTON.cancelled.value:
          className = STATUS_BUTTON.cancelled.className;
        break;
      case STATUS_BUTTON.deleted.value:
          className = STATUS_BUTTON.deleted.className;
        break;
      case STATUS_BUTTON.reviewed.value:
          className = STATUS_BUTTON.reviewed.className;
        break;
      case STATUS_BUTTON.closeout.value:
          className = STATUS_BUTTON.closeout.className;
        break;
        case STATUS_BUTTON.closed.value:
          className = STATUS_BUTTON.closed.className;
        break;
      case STATUS_BUTTON.submitted.value:
          className = STATUS_BUTTON.submitted.className;
        break;
        case STATUS_BUTTON.requested.value:
          className = STATUS_BUTTON.submitted.className;
        break;
        case STATUS_BUTTON.confirmed.value:
          className = STATUS_BUTTON.approved.className;
        break;
        case STATUS_BUTTON.updated.value:
          className = STATUS_BUTTON.updated.className;
        break;
        case STATUS_BUTTON.published.value:
          className = STATUS_BUTTON.updated.className;
        break;
        case STATUS_BUTTON.unpublished.value:
          className = STATUS_BUTTON.unpublished.className;
          break;
        case STATUS_BUTTON.planned.value:
          className = STATUS_BUTTON.planned.className;
        break;
    }
    classname = className;
    }
    return classname;
  }
}
