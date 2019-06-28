import { Router } from 'express';

import { ServiceController } from '..';

/**
 * / route
 *
 * @class ServiceRoute
 */
export class ServiceRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class ServiceRoute
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.create();
  }

  /**
   * Create the routes.
   *
   * @class ServiceRoute
   * @method create
   *
   */
  public create() {
    let controller = new ServiceController();

    this.router.route('/service/list').get(controller.list);
    this.router.route('/service/find/:id').get(controller.find);
    this.router.route('/service/create').post(controller.create);
    this.router.route('/service/update/:id').patch(controller.update);
    this.router.route('/service/delete/:id').delete(controller.delete);
  }
}
