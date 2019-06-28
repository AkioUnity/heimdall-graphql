import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@projectModules/layout/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setPageTitle('Dashboard Page');
  }

}
