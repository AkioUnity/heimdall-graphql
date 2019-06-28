import { Router } from 'express';
import { VehicleRoute, } from '../..';

/**
 * / route
 *
 * @class VehicleBaseRoute
 */
export class VehicleBaseRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class VehicleBaseRoute
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
    new VehicleRoute(this.router);
  }
}
