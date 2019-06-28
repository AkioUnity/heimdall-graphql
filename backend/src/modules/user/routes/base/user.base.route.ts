import { Router } from 'express';
import { UserRoute, AuthenticationRoute } from '../..';

/**
 * / route
 *
 * @class BaseRoute
 */
export class UserBaseRoute {
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
    new UserRoute(this.router);
    new AuthenticationRoute(this.router);
  }
}
