/** @jsx React.DOM */

'use strict';

var React = require('react'),

    Mycomponent = React.createClass({
      render: function() {
        return (
          <h1 className="Mycomponent">Picture Element Demo</h1>
        )
      }
    });

module.exports = Mycomponent;
