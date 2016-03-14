(function(React, module, undefined) {
  var Item = require('./Item.jsx');
  
  module.exports = React.createClass({
    render: function() {
      return (
        <table className="table table-striped table-condensed">
          <thead>
            <tr>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(function(item) {
              return <Item key={item._id} data={item}/>;
            })}
          </tbody>
        </table>
      );
    }
  });
}(React, module));