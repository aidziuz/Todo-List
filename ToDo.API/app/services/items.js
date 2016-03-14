var uuid = require('node-uuid');
var repository = require('../repositories/items.js');
var highestOrder;

function getMax(items){
    var highest = Number.NEGATIVE_INFINITY;
    var tmp;
    for (var i=0; i<items.length; i++) {
        tmp = items[i].Order;
        if (tmp > highest) highest = tmp;
    }
    if (highest == Number.NEGATIVE_INFINITY)
        highest = 0;
    return highest;
}

repository.getItems(function(items){
    highestOrder = getMax(items);
});

exports.createItem = function(name, callback){
    highestOrder++;

    var item = {
        name: name,
        order: highestOrder
    }

    repository.createItem(item, callback);

}

exports.getItems = function(callback){
    repository.getItems(callback);
}

exports.deleteItem = function(itemId, callback){
    repository.getItem(itemId, function(item){     
        if (item != null)
            repository.deleteItem(item);
        callback(item);
    });
}

exports.getItem = function(itemId, callback){
    repository.getItem(itemId, function(item){     
        callback(item);
    });
}