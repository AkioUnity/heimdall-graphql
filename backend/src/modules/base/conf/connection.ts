import { Sequelize } from 'sequelize';

import { DB_CREDENTIALS } from './connection_string';

export class Connection {
  sequelize: any;
  // sequelize: Sequelize;
  constructor() { }
  public createConnection(): Sequelize {
    /** Instantiating Sequelize instance for creating connection */

    this.sequelize = new Sequelize(DB_CREDENTIALS.database, DB_CREDENTIALS.username, DB_CREDENTIALS.password, {
      host: DB_CREDENTIALS.host, dialect: 'mysql'
    });

    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    this.sequelize['User'] = this.sequelize.import('../../user/models/schema/user');
    this.sequelize['SampleData'] = this.sequelize.import('../../user/models/schema/sample-data');
    this.sequelize['Vehicle'] = this.sequelize.import('../../vehicle/models/schema/vehicle');
    this.sequelize['Service'] = this.sequelize.import('../../service/models/schema/service');
    return this.sequelize;
  }
}
