import { Component } from '@angular/core';

/**
 * Overlay Component
 *
 * How to use?
 *
 * <shared-mat-card-loader *ngIf="!loaded"> </shared-mat-card-loader>
 */
@Component({
  selector: 'shared-mat-card-loader',
  templateUrl: './mat-card-loader.component.html',
  styleUrls: ['./mat-card-loader.component.scss']
})
export class MatCardLoaderComponent {
  constructor() { }
}
