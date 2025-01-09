import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  public attachmentData = new BehaviorSubject<any>(null);
  getAttachment$ = this.attachmentData.asObservable();

  public agGridAction = new BehaviorSubject<any>(null);
  getAgGridAction$ = this.agGridAction.asObservable();

  setAttachment(data: any) {
    this.attachmentData.next(data);
  }

  resetAttachment() {
    this.attachmentData.next(null);
  }

  setAgGridAction(data: any) {
    this.agGridAction.next(data);
  }
  resetAgGridAction() {
    this.agGridAction.next(null);
  }
}
