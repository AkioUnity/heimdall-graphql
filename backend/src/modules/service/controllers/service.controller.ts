import { Request, Response, NextFunction } from 'express';

import { CONFIGURATIONS, ErrorHandler } from '../../base';
import { ServiceModel } from '..';

export class ServiceController {
  constructor() { }

  list(req: Request, res: Response, next: NextFunction) {

    const offset = (req.query.offset) ? Number(req.query.offset) : CONFIGURATIONS.OFFSET;
    const limit = (req.query.limit && req.query.limit > 0) ? Number(req.query.limit) : CONFIGURATIONS.LIMIT;
    const options = { offset, limit };

    new ServiceModel().findAndCountAll(options).then(result => {

      if (result && !result['error']) {

        res.json(result);

      } else {

        ErrorHandler.sendCustomError(result, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  find(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id
    new ServiceModel().find(id).then(result => {

      if (result) {

        res.json(result);

      } else {

        ErrorHandler.sendCustomError(ErrorHandler.recordNotFound, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  create(req: Request, res: Response, next: NextFunction) {
    let item = req.body;

    new ServiceModel().create(item).then(result => {

      if (result && !result['error']) {

        res.json(result);

      } else {

        ErrorHandler.sendCustomError(result, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  update(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let item = req.body;

    new ServiceModel().update(id, item).then(result => {

      if (result) {

        res.json({success: true, message: 'Record has been updated'});

      } else {

        ErrorHandler.sendCustomError(ErrorHandler.recordNotFound, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;

    new ServiceModel().delete(id).then(result => {

      if (result) {

        res.json({success: true, message: 'Record has been deleted'});

      } else {

        ErrorHandler.sendCustomError(ErrorHandler.recordNotFound, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

}
