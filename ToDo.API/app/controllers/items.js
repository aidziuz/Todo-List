var itemsService = require('../services/items.js');

exports.getItems = function(req, res, next){
    itemsService.getItems(function(docs){
        res.json(docs);
        next()
    });
};

exports.getItem = function(req, res, next){
    itemsService.getItem(req.params.itemId, function(item){
        if (item == null)
            res.send(404);
        else
            res.json(item);

        next();
    });
};

exports.createItem = function(req, res, next){
    if (!req.body || !req.body.name){
        res.status(400);
        res.json({
            error: "Name is missing."
        });
        return next();
    }

    itemsService.createItem(req.body.name, function(item){
        res.json(item);
        return next();
    });
};

exports.deleteItem = function(req, res, next){
    itemsService.getItem(req.params.itemId, function(item){
        console.log(item);
        if (!item){
            res.send(404);
            return next();
        }

        itemsService.deleteItem(item._id, function(deletedItem){
            console.log(deletedItem);
            res.send(200);
            return next();
        });
    });
}