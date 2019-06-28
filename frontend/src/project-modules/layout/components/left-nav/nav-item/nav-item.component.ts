import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { NavService } from "@projectModules/layout/services";
import { NavItemInterface } from "@projectModules/layout/interfaces";

@Component({
  selector: 'layout-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavItemComponent implements OnInit {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItemInterface;
  @Input() depth: number;

  constructor(
    private navService: NavService,
    public router: Router
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.link && url) {
        // console.log(`Checking '/${this.item.link}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.link}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.link} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItemInterface) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
