var fs = require('fs');
var Datastore = require('nedb');

var filesPath = process.cwd() + '/db';
fs.mkdir(filesPath, function(err){
});

function getDbPath(name){
    return filesPath + '/' + name + '.db';
}

db = new Datastore({filename: getDbPath('items'), autoload: true});

db.ensureIndex({ fieldName: 'order' }, function (err) {
    if (err){
        console.error(err);
        throw err;
    }
});

function handleError(err){
    if (err){
        console.error(err);
        throw err;
    }
}

exports.getItems = function(callback){
    db.find({}).sort({order: 1}).exec(function(err, docs){
        handleError(err);
        callback(docs)
    });
}

exports.createItem = function(item, callback){
    if (item._id){
        throw "_id cannot be provided.";
    }
    db.insert(item, function(err, doc){
        handleError(err);
        callback(doc);
    });
}; 

exports.deleteItem = function(item){
    db.remove({_id: item._id}, function(err){
        handleError(err);
    });
};

exports.getItem = function(itemId, callback){
    db.findOne({_id: itemId}, function(err, doc){
        handleError(err);
        callback(doc);
    });
};