(function(React, module, undefined) {
  var Items = require('./Items.jsx'),
      ItemForm = require('./ItemForm.jsx');
  
  module.exports = React.createClass({
    render: function() {
      return (
        <div className="container">
          <div className="page-header">
            <h1>Todo items</h1>
          </div>
          <Items data={this.props.items} />
          <ItemForm />
        </div>
      );
    }
  });
}(React, module));