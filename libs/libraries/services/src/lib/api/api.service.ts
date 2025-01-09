import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private ngUnsubscribe$ = new Subject();
  constructor(private http: HttpClient) {}

  get(path: string,options: any = {}) {
    return this.http.get(path,{ ...options }).pipe(takeUntil(this.ngUnsubscribe$));
  }

  post(path: string, payload: any) {
    return this.http.post(path, payload).pipe(takeUntil(this.ngUnsubscribe$));
  }
  put(path: string, payload: any) {
    return this.http.put(path, payload).pipe(takeUntil(this.ngUnsubscribe$));
  }
  delete(path: string, payload: any) {
    return this.http.delete(path, payload).pipe(takeUntil(this.ngUnsubscribe$));
  }
}
