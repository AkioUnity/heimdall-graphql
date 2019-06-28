import { Op } from 'sequelize';
import { BaseModel } from '../../base';
// import { CONFIGURATIONS } from '@modules/base/conf/configurations';
// import { ErrorHandler } from '@modules/base/conf/error-handler';
import { CONFIGURATIONS } from '../../base/conf/configurations';
import { ErrorHandler } from '../../base/conf/error-handler';

export class VehicleModel extends BaseModel {

  constructor() {
    super('Vehicle');
  }

  public search(searchParams) {
    return new Promise(resolve => {

      if (!searchParams.query) resolve(ErrorHandler.invalidSearchParams);

      const attributes = ['id', 'year', 'make', 'model', 'engineTrim'];
      const conditions = this.prepareSearchConditions(searchParams.query);
      const options = this.prepareSearchOptions(searchParams);

      if (options.limit > CONFIGURATIONS.RECORD_LIMIT) resolve(ErrorHandler.exceededRecordLimit);

      resolve(this.findAndCountAll(options, attributes, conditions));

    });
  }

  private prepareSearchConditions(searchQuery) {
    const searchQueryArray = searchQuery.split(" ");
    const fPrm = searchQueryArray[0], sPrm = searchQueryArray[1], tPrm = searchQueryArray[2]; // First, Second and Third params respecively
    let conditions = {};
    let paramsConds: any = { make: [], model: [] };

    this.prepareParamsConds([fPrm, sPrm, tPrm], paramsConds, conditions);

    if (paramsConds.make.length > 0 || paramsConds.model.length > 0)
      conditions[Op.or] = paramsConds;

    return conditions;

  }

  private prepareParamsConds(paramsArr, paramsObj, mainCondObj) {
    for (let param of paramsArr) {

      if (param) {

        if (isNaN(param)) {

          paramsObj.make.push(param);
          paramsObj.model.push(param);

        } else mainCondObj['year'] = param;
      }
    }
  }

  private prepareSearchOptions(searchParams) {
    const offset = (searchParams.offset) ? Number(searchParams.offset) : CONFIGURATIONS.OFFSET;
    const limit = (searchParams.limit) ? Number(searchParams.limit) : CONFIGURATIONS.LIMIT;
    return { offset, limit };

  }


}
