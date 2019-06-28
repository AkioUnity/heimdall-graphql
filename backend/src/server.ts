import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieSession from 'cookie-session';
import * as crypto from 'crypto';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';

import { BaseRoute } from './modules/base';
import { CONFIGURATIONS } from './modules/base';
import { ErrorHandler } from './modules/base/conf/error-handler';

/**
 * The server.
 *    static app: any;

 * @class Server
 */
export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    this.config();
    this.routes();
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    //empty for now
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {

    const whitelist = ['http://localhost:4200', 'https://081392creare-hoopty.com', 'http://314e789f.ngrok.io', 'https://314e789f.ngrok.io']
    const corsOptions = {
      origin: (origin, callback) => {
        console.log('current origin: ', origin);
        if (whitelist.indexOf(origin) !== -1) {
          console.log('in if: ', origin);
          callback(null, true)
        } else {
          console.log('in else : ', origin);
          callback(new Error('Not allowed by CORS'))
        }
      }, 
      credentials: true
    }

    this.app.use(cors(corsOptions));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.json({ limit: '250mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));

    /* ----- session ----- */
    this.app.use(cookieSession({
      name: 'session',
      keys: [crypto.randomBytes(32).toString('hex')],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.errorHandler();
  }

  /**
   * Handle error.
   * TODO:high:Mohsin: error handling not working properly also build proper understanding
   * @class Server
   * @method errorHandler
   * @return void
   */
  private errorHandler() {
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('Error handler: -------------------------------------');

        return res.status(err.status || 500).send({
          message: err.message || err.name || err
        });
      });
    });
  }

  /**
   * authorize jsonwebtoken
   * @param req
   * @param res
   * @param next
   */
  private authorize(req, res, next) {
    // TODO:low: Following is not proper way to skip auth on public URLs. There should be some configuration in jwt to skip some public urls
    var foundPublicUrl = CONFIGURATIONS.PUBLIC_URLS.find(element => {

      if (element == req.originalUrl) {
        return true;
      } else {
        // check if url exists in public urls without last parameter i.e id 
        let lastIndex = req.originalUrl.lastIndexOf('/');
        let originalUrl = req.originalUrl.substr(0, lastIndex);
        if (element == originalUrl) {
          return true;
        }
      }

    });

    if (foundPublicUrl) {
      //TODO:high: For now Mohsin has added delay on each request to test the loading issues for user interactivity
      // Remove it before pusing to server.
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(true);
      //   }, 1500);
      // }).then(() => {
      //   next();
      // })
      next();
    } else {
      // check header or url parameters or post parameters for token
      let token = req.headers['token'];

      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, CONFIGURATIONS.SECRET, function (err, decoded) {
          if (err) {
            return res.json({
              error: true,
              message: 'Failed to authenticate token.'
            });
          } else {
            next();
          }
        });
      } else {
        // if there is no token
        return ErrorHandler.sendAuthorizationError(ErrorHandler.invalidToken, res, next);
      }
    }
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {

    // console.log('/*****************************************************************');

    // let buff = crypto.randomBytes(32);
    // console.log('buff: ', buff);

    // let buffJ = JSON.stringify(buff);
    // console.log('buffJ: ', buffJ);

    // let buffP = JSON.parse(buffJ);
    // // console.log('buffP: ', buffP);

    // let buffPData = JSON.stringify(buffP.data);
    // console.log('buffPData: ', buffPData);

    // let buffPDataEnc = base64url.encode(buffPData);
    // console.log('buffPDataEnc: ', buffPDataEnc);

    // let buffPDataDec = base64url.decode(buffPDataEnc);
    // console.log('buffPDataDec: ', buffPDataDec);

    // let buffPDataDecP = JSON.parse(buffPDataDec);
    // console.log('buffPDataDecP: ', buffPDataDecP);

    // console.log('*****************************************************************/');


    let router: express.Router;
    router = express.Router();
    // router.use(this.authorize);

    new BaseRoute(router);
    this.app.use('/api/v1/', router);
  }
}
