import { Component, OnInit } from '@angular/core';

import { LayoutService } from '@projectModules/layout/services';

@Component({
  selector: 'layout-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  public pageTitle: string;

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.pageTitle$.subscribe(response => {
      this.pageTitle = response;
    });
  }

  // Go back to previous page
  public previous() {
    window.history.back();
  }
}
