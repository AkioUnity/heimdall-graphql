import { Component } from '@angular/core';
/**
 * Overlay Component
 *
 * How to use?
 *
 * <shared-page-loader *ngIf="!loaded"> </shared-page-loader>
 */
@Component({
  selector: 'shared-small-overlay',
  templateUrl: './small-overlay.component.html',
  styleUrls: ['./small-overlay.component.scss']
})
export class SmallOverlayComponent {
  constructor() { }
}
