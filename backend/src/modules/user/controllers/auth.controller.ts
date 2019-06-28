import { Request, Response, NextFunction } from 'express';
import base64url from 'base64url';

import { Utils } from './../';

import { ErrorHandler } from '../../base';
import { UserModel, SampleDataModel } from '..';

export class AuthController {
  constructor() { }

  register(req: Request, res: Response, next: NextFunction) {

    let user = req.body;
    new UserModel().register(user).then(result => {

      if (result && !result['error']) res.json(result);
      else ErrorHandler.sendCustomError(result, res);

    }).catch(err => ErrorHandler.sendServerError(err, res, next));
  }

  verifyPhoneNumber(req: Request, res: Response, next: NextFunction) {

    let data = {
      twilioOTP: req.body.twilioOTP,
      twilioUUID: req.get('twilioUUID')
    };
    console.log('data: ', data)
    new UserModel().verifyPhoneNumber(data).then(result => {

      if (result && !result['error']) res.json(result);
      else ErrorHandler.sendCustomError(result, res);

    }).catch(err => ErrorHandler.sendServerError(err, res, next));
  }

  signup(req: Request, res: Response, next: NextFunction) {

    let user = req.body;
    new UserModel().signup(user).then(challengeMakeCred => {

      if (challengeMakeCred && !challengeMakeCred['error']) {

        // challengeMakeCred['status'] = 'ok'; // as per following example, should be removed

        req['session'].challenge = challengeMakeCred['challenge'];
        req['session'].email = user.email;
        res.json(challengeMakeCred);

      } else {

        ErrorHandler.sendCustomError(challengeMakeCred, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  fido2Login(req: Request, res: Response, next: NextFunction) {

    let user = req.body;
    new UserModel().fido2Login(user).then(getAssertion => {

      console.log('getAssertion: ', getAssertion);
      if (getAssertion && !getAssertion['error']) {

        // getAssertion['status'] = 'ok'; // as per following example, should be removed

        req['session'].challenge = getAssertion['challenge'];
        req['session'].email = user.email;
        res.json(getAssertion);

      } else {

        ErrorHandler.sendCustomError(getAssertion, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  verifyFido2Resp(req: Request, res: Response, next: NextFunction) {

    if (!req.body || !req.body.id
      || !req.body.rawId || !req.body.response
      || !req.body.type || req.body.type !== 'public-key') {
      ErrorHandler.sendCustomError(ErrorHandler.fido2AuthAttrMissing, res);

      return;
    }

    let webauthnResp = req.body;
    // console.log('webauthnResp: ', webauthnResp);
    console.log("req['session'].email: ", req['session'].email);

    let result;
    if (webauthnResp.response.attestationObject !== undefined) {
      /* This is create cred */
      result = new Utils().verifyAuthenticatorAttestationResponse(webauthnResp);
      console.log('result: ', result);

      if (result.verified) {
        /** update authenticator info and registered status */
        let userToUpdate = {
          authenticators: JSON.stringify(result.authrInfo),
          registered: 1
        };
        new UserModel().updateByCondition({ email: req['session'].email }, userToUpdate);
        // database[request.session.username].authenticators.push(result.authrInfo);
        // database[request.session.username].registered = true
      }

    } else if (webauthnResp.response.authenticatorData !== undefined) {
      /* This is get assertion */

    } else {
      ErrorHandler.sendCustomError(ErrorHandler.fido2InvalidKeyRes, res);
    }

    if (result.verified) {
      req['session'].loggedIn = true;
      res.json({ success: true, message: 'Fido 2 YubiKey has been verified successfully' });
    } else {
      ErrorHandler.sendCustomError(ErrorHandler.fido2InvalidSignature, res);
    }

    // let clientData = JSON.parse(base64url.decode(webauthnResp.response.clientDataJSON));
    // console.log('clientData: ', clientData);

    // res.json(clientData);

    /* Check challenge... */
    // if (clientData.challenge !== req.session.challenge) {
    //   response.json({
    //     'status': 'failed',
    //     'message': 'Challenges don\'t match!'
    //   })
    // }

    /* ...and origin */
    // if (clientData.origin !== config.origin) {
    //   response.json({
    //     'status': 'failed',
    //     'message': 'Origins don\'t match!'
    //   })
    // }

    // let formData = req.body;
    // new UserModel().verifyFido2Resp(formData).then(result => {

    //   if (result && !result['error']) {

    //     res.json(result);

    //   } else {

    //     ErrorHandler.sendCustomError(result, res);

    //   }
    // }).catch(err => {

    //   ErrorHandler.sendServerError(err, res, next);

    // });
  }

  login(req: Request, res: Response, next: NextFunction) {

    new UserModel().login(req.body).then(result => {

      if (result && !result['error']) {

        res.json(result);

      } else {

        ErrorHandler.sendCustomError(result, res);

      }
    }).catch(err => {

      ErrorHandler.sendServerError(err, res, next);

    });
  }

  saveSampleData(req: Request, res: Response, next: NextFunction) {

    let data = JSON.stringify(req.body);
    let formData = { data: data };
    new SampleDataModel().create(formData).then(result => {

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
