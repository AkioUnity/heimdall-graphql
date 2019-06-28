import { Component } from '@angular/core';

import { GLOBALS_CONSTANTS } from "@app/config";

@Component({
  selector: 'layout-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {

  public menuList = GLOBALS_CONSTANTS.MENU_LIST;

  constructor() { }
}
