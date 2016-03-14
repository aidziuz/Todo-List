(function(React, _) {
  var App = require('./components/App.jsx'),
      Item = require('./models/ItemModel.js');
  
  _.mixin(_.string.exports());
  
  var render = function() {
    Item.query(function(items){
        React.render(React.createElement(App, { items: items }), document.body);
    });
  };

  render();
  Item.subscribe(render);
}(React, _));
