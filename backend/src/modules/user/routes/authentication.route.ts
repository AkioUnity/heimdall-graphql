import { Router } from 'express';

import { AuthController } from '..';

/**
 * / route
 *
 * @class AuthRoute
 */
export class AuthenticationRoute {
  router: Router;

  /**
   * Constructor
   *
   * @class AuthRoute
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.create();
  }

  /**
   * Create the routes.
   *
   * @class AuthRoute
   * @method create
   *
   */
  public create() {
    let controller = new AuthController();

    this.router.route('/auth/login').post(controller.login);
    this.router.route('/auth/signup').post(controller.signup);
    this.router.route('/auth/fido2Login').post(controller.fido2Login);
    this.router.route('/auth/verifyFido2Resp').post(controller.verifyFido2Resp);
    this.router.route('/auth/saveSampleData').post(controller.saveSampleData);
    this.router.route('/auth/register').post(controller.register);
    this.router.route('/auth/verifyPhoneNumber').post(controller.verifyPhoneNumber);
  }
}
