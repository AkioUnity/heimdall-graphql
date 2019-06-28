import { Router } from 'express';

import { UserController } from '..';

/**
 * / route
 *
 * @class User
 */
export class UserRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class UserRoute
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.create();
  }

  /**
   * Create the routes.
   *
   * @class UserRoute
   * @method create
   *
   */
  public create() {
    let controller = new UserController();

    this.router.route('/user/list').get(controller.list);
  }
}
