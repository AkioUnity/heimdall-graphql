import { Connection, CONFIGURATIONS } from '../';
import { ErrorHandler } from '../conf/error-handler';

export class BaseModel {
  public sequelizeModel;
  protected connection;

  constructor(model) {
    this.sequelizeModel = model;
    this.openConnection();
  }

  protected openConnection() {
    if (!CONFIGURATIONS.connection) {
      console.log('-----------------------------------------------------------');
      console.log('Db Connection is created (' + new Date() + ')');
      console.log('-----------------------------------------------------------');
      CONFIGURATIONS.connection = new Connection().createConnection();
    }

    this.connection = CONFIGURATIONS.connection;
  }

  protected closeConnection() {

    this.connection.close();
    CONFIGURATIONS.connection = null;
  }

  /**
   * Find single record by id
   * @param id
   */
  find(id, attributes?, include?) {
    return this.findByCondition(attributes, { id: id }, include);
  }

  /**
   * Find single record by specified condition
   * @param attributes
   */
  findByCondition(attributes, conditions, include?) {
    return this.connection[this.sequelizeModel].findOne(
      this.sequelizeQueryBuilder(attributes, conditions, include)
    );
  }

  /**
   * Find and count all records
   */
  findAndCountAll(options = CONFIGURATIONS.DEFAULT_PAGINAITON, attributes?, conditions?, include?, order?) {

    if (options.limit > CONFIGURATIONS.RECORD_LIMIT) {
      return new Promise(resolve => {
        resolve(ErrorHandler.exceededRecordLimit);
      })
    }

    return this.findAndCountAllByConditions(attributes, conditions, include, order, options);
  }

  /**
   * Find all records with specified attributes
   * @param attributes
   */
  findAll(attributes?, conditions?, include?, order?) {
    return this.findAllByConditions(attributes, conditions, include, order);
  }

  /**
   * Find and count all records with specified
   */
  findAndCountAllByConditions(attributes, conditions, include?, order?, options?) {
    return this.connection[this.sequelizeModel].findAndCountAll(
      this.sequelizeQueryBuilder(attributes, conditions, include, order, options)
    );
  }

  /**
   * Find all records with specified attributes and conditions
   * @param attributes
   */
  findAllByConditions(attributes, conditions, include?, order?, options?) {

    return this.connection[this.sequelizeModel].findAll(
      this.sequelizeQueryBuilder(attributes, conditions, include, order, options)
    );
  }

  /**
   * Update a record for given id
   * @param item
   * @param id
   */
  update(id, item) {
    item = BaseModel.extendItem(item, false);
    return this.connection[this.sequelizeModel].update(item, { where: { id: id } });

  }

  /**
   * Update a record for given condition
   * @param item
   * @param id
   */
  updateByCondition(condition, item) {
    item = BaseModel.extendItem(item, false);
    return this.connection[this.sequelizeModel].update(item, { where: condition });

  }

  /**
   * Create a new record
   * @param item
   */
  create(item) {

    item = BaseModel.extendItem(item, true);

    return this.connection[this.sequelizeModel].create(item);
  }

  /**
   * Count all records
   */
  count() {
    return this.connection[this.sequelizeModel].count();
  }

  /**
   * Delete a record against an id
   * @param id
   */
  delete(id) {
    return this.deleteByConditions({ id: id });
  }

  /**
   * Delete a record by conditions
   * @param conditions
   */
  deleteByConditions(conditions) {

    return this.connection[this.sequelizeModel].destroy(
      this.sequelizeQueryBuilder(null, conditions)
    );
  }

  /**
   * To prepare the sequelize query.
   *
   * @param attributes any
   * @param condition any
   */
  protected sequelizeQueryBuilder(attributes?, condition?, include?, order?, options?) {
    let obj = {};

    if (attributes) {
      obj['attributes'] = attributes;
    }

    obj['where'] = condition;

    if (include) {
      obj['include'] = include;
    }

    if (order) {
      obj['order'] = order;
    }

    if (options && options['offset']) {
      obj['offset'] = options['offset'];
    }

    if (options && options['limit']) {
      obj['limit'] = options['limit'];
    }

    return obj;
  }

  /**
   * extend item with createdBy, updatedBy
   * 'both' parameter is being used to updated both keys created/updated by otherwise only updated by will udpated.
   * @param item object
   * @param both boolean
   */
  static extendItem(item, isCreate?) {

    if (isCreate) {
      item['createdBy'] = 0;
      // item['createdBy'] = CONFIGURATIONS.identity.userId; TODO: normal, implement user session
    }

    item['updatedBy'] = 0;
    // item['updatedBy'] = CONFIGURATIONS.identity.userId; TODO: normal, implement user session

    return item;
  }

}
