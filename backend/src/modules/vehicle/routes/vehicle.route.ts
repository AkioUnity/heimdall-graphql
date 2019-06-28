import { Router } from 'express';

import { VehicleController } from '..';

/**
 * / route
 *
 * @class VehicleRoute
 */
export class VehicleRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class VehicleRoute
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.create();
  }

  /**
   * Create the routes.
   *
   * @class VehicleRoute
   * @method create
   *
   */
  public create() {
    let controller = new VehicleController();

    this.router.route('/vehicle/list').get(controller.list);
    this.router.route('/vehicle/find/:id').get(controller.find);
    this.router.route('/vehicle/create').post(controller.create);
    this.router.route('/vehicle/update/:id').patch(controller.update);
    this.router.route('/vehicle/delete/:id').delete(controller.delete);
    this.router.route('/vehicle/search').get(controller.search);
  }
}
