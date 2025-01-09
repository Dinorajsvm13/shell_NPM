import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  isLoading = new Subject<boolean>();

  loaderShow() {
      this.isLoading.next(true);
  }

  loaderHide() {
      this.isLoading.next(false);
  }
}
