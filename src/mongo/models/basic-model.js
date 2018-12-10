/*
 *  Construct data control function
 *  @class BasicModel
 */

class BasicModel {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   *  Save Document
   *  @param {Object} object.data
   *  @return {Object}
   */
  async save({data}) {
    if (!data) throw 'data is null';
    return await new this.schema(data).save();
  }

  /**
   *  Remove Document
   *  @param {Object} object.query
   *  @return {Object}
   */
  async remove({query}) {
    if (!query) throw 'query is null';
    return await this.schema.remove(query);
  }

  /**
   *  Remove One or More Documents
   *  @param {Object} object.query
   *  @return {Object}
   */
  async deleteMany({query}) {
    if (!query) throw 'query is null';
    return await this.schema.deleteMany(query);
  }

  /**
   *  Remove One Document
   *  @param {Object} object.query
   *  @return {Object}
   */
  async deleteOne({query}) {
    if (!query) throw 'query is null';
    return await this.schema.deleteOne(query);
  }

  /**
   *  Find Multi Documents
   *  @param {Object} object.query    - condition
   *  @param {Object} object.select
   *  @param {Object} object.options
   *  @return {Object}
   */
  async find({query, select = {}, options = {}}) {
    if (!query) throw 'query is null';
    return await this.schema.find(query, select, options);
  }

  /**
   *  Find One Document
   *  @param {Object} object.query    - condition
   *  @param {Object} object.select
   *  @param {Object} object.options
   *  @return {Object}
   */
  async findOne({query, select = {}, options = {}}) {
    if (!query) throw 'query is null';
    return await this.schema.findOne(query, select, options);
  }

  /**
   *  Update Multi Documents
   *  @param {Object} object.query    - condition
   *  @param {Object} object.select
   *  @param {Object} object.options
   *  @return {Object}
   */
  async update({query, update, options = {}}) {
    if (!query) throw 'query is null';
    if (!update) throw 'update is null';
    return await this.schema.update(query, update, options);
  }

  /**
   *  Update One Document
   *  @param {Object} object.query    - condition
   *  @param {Object} object.select
   *  @param {Object} object.options
   *  @return {Object}
   */
  async updateOne({query, update, options = {}}) {
    if (!query) throw 'query is null';
    if (!update) throw 'update is null';
    return await this.schema.updateOne(query, update, options);
  }

  async populate({collections, options = {}}) {
    if (!collections) throw 'collections is null';
    return await this.schema.populate(collections, options);
  }
}

export default BasicModel;
