import { Router } from 'express';
import { ServiceRoute, } from '../..';

/**
 * / route
 *
 * @class ServiceBaseRoute
 */
export class ServiceBaseRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class ServiceBaseRoute
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
    new ServiceRoute(this.router);
  }
}
