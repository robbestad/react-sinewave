/** @jsx React.DOM */

(function(){
    'use strict';
})();

var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};
var React = require('react'),

    FastSin = React.createClass({
        getInitialState: function () {
            return {
                //windowWidth: window.innerWidth,
                myTicker: 1
            }
        },
        getDefaultProps: function () {
            return {
                mySinTable: false
            }
        },
        mixins: [SetIntervalMixin], // Use the mixin
        componentDidMount: function() {
            this.setInterval(this.ticker, 20); // Call a method on the mixin
        },
        ticker: function() {
            this.setState({
                myTicker:  this.state.myTicker + 1
            });
        },
        fastSin: function(steps){
                var table = [],
                    ang = 0,
                    angStep = (Math.PI *2) / steps;
                do {
                    table.push(Math.sin(ang));
                    ang += angStep
                } while (ang < Math.PI * 2);
                return table;
        },
        draw: function(){
            var divs = [];
            for (var i=0; i < window.innerWidth; i++) {
                divs += '<div style = "position:absolute;width:1px;height:0px;'
                + 'background-color:#0d0; top:280px; left: '
                + i + 'px;"></div>';
            }
            return divs;
        },

        render: function() {
            var myStyle = {
                width: '480px',
                height: '320px',
                bgColor: '#000',
                position: 'relative'
            };

            // Define sinTable
            var sinTable;
            if(!this.props.sinTable){
                sinTable = this.fastSin(4096);
                this.props.sinTable = sinTable;
            }
            sinTable = this.props.sinTable; if(!sinTable) return (<div></div>);

            // Define page
            var pageWidth = document.getElementById("fastsin").offsetWidth,
                x=this.state.myTicker;

            var drawGraph = function(ang, freq, height) {
                var height2 = height * 2, divs = [];
                for (var i = 0; i < pageWidth/3; i++) {
                    var barStyle={
                        top: 160 - height + sinTable[(ang + (i * freq)) & 4095] * height + 'px',
                        height: height2 + 'px',
                        position:'absolute',
                        width:'10px',
                        backgroundColor:'#0d0',
                        left:i*3+'px'
                    };
                    divs.push(<div key={i} style={barStyle}></div>);
                }
                return divs;
            };

            divs=drawGraph(x * 150, 32 - (sinTable[(x * 20) & 4095] * 16), 50 - (sinTable[(x * 10) & 4095] * 20));

            return (
                <div ref="myDiv" style={myStyle}>{divs}</div>
                )
        }
    });

module.exports = FastSin;
