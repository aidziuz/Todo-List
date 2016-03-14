(function(React, _) {
  var List = require('../models/ItemModel.js');
  module.exports = React.createClass({
    isDisabled:  function() {
      return _.isBlank(this.state.name);
    },
    handleNewName: function(event) {
      this.setState(_.extend(this.state, {
        name: event.target.value
      }));
    },
    addList: function(event) {
      var list = new List(this.state);
      list.create();
      this.setState(this.getInitialState());

      event.preventDefault();
      event.stopPropagation();
    },
    render: function() {
      var disabled = this.isDisabled();
      return (
        <form role="form" onSubmit={this.addList}>
          <div className="row">
            <div className="col-sm-5">
              <label className="sr-only" htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" value={this.state.name}
                placeholder="New ToDo item name..." autofocus onChange={this.handleNewName} />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default form-control" disabled={disabled}>Add</button>
            </div>
          </div>
        </form>
      );
    },
    getInitialState: function() {
      return {
        name: ""
      };
    }
  });
}(React, _));
