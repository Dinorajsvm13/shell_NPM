import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {


  public $isFullscreen = new BehaviorSubject<boolean>(false);
  constructor() {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.$isFullscreen.next(true)
      } else {
        this.$isFullscreen.next(false)
      }
    });
  }

  toggleFullscreen() {

    if (document.fullscreenElement != null) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }

  }

  enterFullscreen() {
    const elem = document.documentElement as any;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    this.$isFullscreen.next(true);
  }

  exitFullscreen() {
    const elem = document as any;
    if (elem.exitFullscreen) {
      elem.exitFullscreen();
    } else if (elem?.mozCancelFullScreen) {
      elem.mozCancelFullScreen();
    } else if (elem.webkitExitFullscreen) {
      elem.webkitExitFullscreen();
    } else if (elem.msExitFullscreen) {
      elem.msExitFullscreen();
    }
    this.$isFullscreen.next(false);
  }


}
