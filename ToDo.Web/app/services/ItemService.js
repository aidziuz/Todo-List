(function(JSON, $) {
  var endpoint = 'http://localhost:30080/items';
  var ItemService = function() {
    this.getItems = function(callback){
      $.ajax({
        url: endpoint,
        success: function(data){
          callback(data);
        },
        datatype: 'json'
      });
    };
    this.createItem = function(list, callback){
      console.log(list);
      $.ajax({
        url: endpoint,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(list),
        success: function(data){
          callback(data);
        }
      });
    };
    this.deleteItem = function(list, callback){
      console.log(list);
      $.ajax({
        url: endpoint + '/' + list.id,
        type: 'DELETE',
        success: function(data){
          callback(data);
        }
      });
    };
  };
  module.exports = new ItemService();
}(JSON, $));