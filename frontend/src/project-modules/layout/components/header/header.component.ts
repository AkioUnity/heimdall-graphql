import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { GLOBALS_CONSTANTS } from '@app/config';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // public username: string;
  public appTitle: string = GLOBALS_CONSTANTS.APP_TITLE;

  constructor(private router: Router) { }

  ngOnInit() {
    // this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
