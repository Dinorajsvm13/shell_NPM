import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  apiUrl: string = '';
  public decodedToken: any;
  public appDetails: any;

  constructor() {}

  setUserDetails(userDetails: any) {
    localStorage.setItem('user', userDetails);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value
    );
  }

  getItem(key: string) {
    return localStorage.getItem(key) || '';
  }

  getUserDetails() {
    const userInfo = localStorage.getItem('user') as any;
    if (userInfo && userInfo != 'undefined' && userInfo != 'null') {
      return JSON.parse(userInfo);
    } else {
      localStorage.clear();
    }
  }
  checkUserDetails() {
    return localStorage.getItem('user') !== null;
  }

  clearStorageRedirect() {
    this.deleteToken();
    window.close();
  }

  deleteToken(): void {
    localStorage.clear();
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  getRefreshToken(): string {
    return localStorage.getItem('refreshToken')!;
  }
  setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  getAccessToken(): string {
    return localStorage.getItem('accessToken')!;
  }

  decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);
    this.decodedToken = decoded;
    this.setAppInfoDetails(decoded);
  }
  setAppInfoDetails(decoded: any) {
    if (decoded) {
      this.appDetails = decoded;
    }
  }
  getAppInfoDetails(): any {
    return this.appDetails;
  }
  getDecodedToken() {
    return this.decodedToken;
  }

  getTokenValueByKey(key: string) {
    if (this.decodedToken) {
      return this.decodedToken[key];
    } else {
      if (!this.getUserDetails()) return null;
      return this.getUserDetails()[key];
    }
  }
  getDateAndTimeFormat(dateString: string, timeInclude?: boolean) {
    const userDateFormat = this.getTokenValueByKey('dateTimeFormat');
    if (timeInclude) {
      return dayjs(dateString).format(
        userDateFormat.replace('dd', 'DD')?.replace('yyyy', 'YYYY')
      );
    } else {
      return dayjs(dateString).format(
        userDateFormat.replace('dd', 'DD')?.replace('HH:mm', '')?.trim()
      );
    }
  }
  getDateDBFormate(date: any): string {
    return  dayjs(date).isValid() ? dayjs(date).format('YYYY/MM/DD') : '';
  }
}
