(function(React, module, undefined) {
  module.exports = React.createClass({
    render: function() {
      return (
        <tr>
          <td>
            <div className="pull-left">
              <strong>{this.props.data.name}</strong>
            </div>
            <div className="pull-right">
              <button type="button" className="btn btn-danger pull-right" onClick={this.deleteItem}>
                <i className="fa fa-trash-o"></i>
              </button>
            </div>
          </td>
        </tr> 
      );
    },
    deleteItem: function() {
      this.props.data.delete();
    }
  });
}(React, module));