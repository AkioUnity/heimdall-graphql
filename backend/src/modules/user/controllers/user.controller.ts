import { Request, Response, NextFunction } from 'express';

import { CONFIGURATIONS, ErrorHandler } from '../../base';
import { UserModel } from '..';

export class UserController {
  constructor() { }

  list(req: Request, res: Response, next: NextFunction) {

    const offset = (req.query.offset) ? Number(req.query.offset) : CONFIGURATIONS.OFFSET;
    const limit = (req.query.limit && req.query.limit > 0) ? Number(req.query.limit) : CONFIGURATIONS.LIMIT;
    const options = { offset, limit };

    new UserModel().findAndCountAll(options).then(result => {

      if (result && !result['error']) {

        res.json(result);

      } else {

        ErrorHandler.sendCustomError(result, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

}
