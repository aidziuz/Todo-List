(function(_) {
  var ItemService = require('../services/ItemService.js');
  
  var statics = {
    subscribers: [],
    query: function(callback) {
        ItemService.getItems(function(data){
          var items = _.map(data, function(item) {
            return new ItemModel(item);
          });
          callback(items);
        });
    },
    publish: function(data) {
      _.each(this.subscribers, function(callback) {
        callback(data);
      });
    },
    subscribe: function(callback) {
      this.subscribers.push(callback);
    },
    delete: function(list) {
      var static = this;
      ItemService.deleteItem(list, function(data){
        static.publish(data);
      });
    },
    create: function(list){
      var static = this;
      ItemService.createItem(list, function(data){
        static.publish(data);
      });
    }
  };
  
  var ItemModel = function(item) {
    this.id = item._id;
    this.name = item.name;
    this.order = item.order;
    
    this.create = function() {
      statics.create(this);
    };

    this.delete = function() {
      statics.delete(this);
    };
  };
  
  _.extend(ItemModel, statics);
  module.exports = ItemModel;
}(_));