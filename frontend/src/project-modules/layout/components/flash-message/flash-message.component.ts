import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LayoutService } from '@projectModules/layout/services';

/**
 * How To Use?
 * this.layoutService.flashMsg({ msg: 'Your custom message is here', msgType: 'success', timeout: 5000 }); 
 * 
 * msg: string (custome message string) 
 * msgType : string (success, error, warning) default success
 * timeout: number = default 5000 ms (how long message should should be displayed on page)
 * 
 * Following will display success message for 5 seconds.
 * this.layoutService.flashMsg({ msg: 'Your custom message is here'}); 
 * 
*/
@Component({
  selector: 'layout-flash-msg',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.scss'],
  animations: [
    trigger('msgState', [
      state('inactive', style({ transform: 'translateX(100%)' })),
      state('active', style({ transform: 'translateX(-100%)' })),
      transition('* => active', animate(200)),
      transition('active => inactive', animate(300))
    ])
  ]
})
export class FlashMessageComponent {

  public fms = [];

  constructor(private layoutService: LayoutService) {

    this.layoutService.flashMsg$.subscribe(fmData => {
      this.pushFlashMsg(fmData);
    });
  }

  /**
   * Push Flash messages
   * 
   * @param fmData object
   */
  private pushFlashMsg(fmData) {

    let fm = {};

    Object.assign(fm, fmData);

    fm['msgType'] = (fm['msgType'] ? fm['msgType'] : 'success');
    fm['timeout'] = (fm['timeout'] ? fm['timeout'] : 5000);
    fm['state'] = 'active';

    // assign a timestap to make it unique so we can remove it when timeout meets.
    fm['timestamp'] = 1000;
    const timestamp = fm['timestamp'] = +(Number(fm['timeout']) + Number(new Date()));

    // Push fm item at 0 index.
    this.fms.unshift(fm);

    setTimeout(() => {
      for (let counter = 0; counter < this.fms.length; counter++) {
        if (this.fms[counter]['timestamp'] === timestamp) {
          this.closeMe(counter);
        }
      }

    }, fm['timeout']);
  }

  /**
   * Close flash message
   * @param {index: number}
   */
  closeMe(index: number) {

    this.fms[index]['state'] = 'inactive';

    setTimeout(() => {
      this.fms.splice(index, 1);
    }, 350);

  }
}
