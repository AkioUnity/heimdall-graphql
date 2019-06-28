import { Component } from '@angular/core';

/**
 * Overlay Component
 *
 * How to use?
 *
 * <shared-page-loader *ngIf="!loaded"> </shared-page-loader>
 */
@Component({
  selector: 'shared-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
})
export class PageLoaderComponent {

  public startLoading = false;

  constructor() { 
    setTimeout(() => {
      this.startLoading = true;
    }, 400);
  }
}
