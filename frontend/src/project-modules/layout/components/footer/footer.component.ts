import { Component } from '@angular/core';

import { GLOBALS_CONSTANTS } from '@app/config';

@Component({
  selector: 'layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public appTitle: string = GLOBALS_CONSTANTS.APP_TITLE;
  constructor() {}
}
