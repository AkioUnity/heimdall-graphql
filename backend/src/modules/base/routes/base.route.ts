import { Router } from 'express';

import { UserBaseRoute } from '../../user';
import { VehicleBaseRoute } from '../../vehicle';
import { ServiceBaseRoute } from '../../service';

/**
 * / route
 *
 * @class BaseRoute
 */
export class BaseRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class BaseRoute
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.initAll();
  }

  /**
   * init all routes
   */
  public initAll() {
    new UserBaseRoute(this.router);
    new VehicleBaseRoute(this.router);
    new ServiceBaseRoute(this.router);
  }
}
