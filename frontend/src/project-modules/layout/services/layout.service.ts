import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  // Current page title / sub-header title
  private pageTitleSource = new Subject<string>();
  pageTitle$ = this.pageTitleSource.asObservable();

  /**
   * For displaying Flash message 
   * 
   */
  private flashMsgSource = new Subject<object>();
  flashMsg$ = this.flashMsgSource.asObservable();

  constructor() { }

  /**
   * Set current page title / sub-header title
   * @param {pageTitle: string}
   */
  setPageTitle(pageTitle: string) {
    this.pageTitleSource.next(pageTitle);
  }

  /**
   * Show Flash message
   * @param {fmData: object}
   */
  flashMsg(fmData: object) {
    this.flashMsgSource.next(fmData);
  }

}
