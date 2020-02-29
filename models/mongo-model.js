// a generic CRUD model using mongoose that can be used over and over

class Model {
  constructor(Schema) {
    this.Schema = Schema;
  }


  create(record) {
    // build new instance of object then save
    const createNewInstance = new this.Schema(record);
    return createNewInstance.save();
  }

  read(id) {
    const returnValue = id ? { _id: id } : {};
    return this.Schema.find(returnValue);
  }

  update(id, record) {
    return this.Schema.findByIdAndUpdate(id, record, { new: true });
  }

  delete(id) {
    return this.Schema.findByIdAndDelete(id);
  }
}


module.exports = Model;

