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
                myTicker: 1,
                length:2048
            }
        },
        getDefaultProps: function () {
            return {
                mySinTable: false
            }
        },
        componentWillMount: function() {
            //this.calculcateDivs(this.state.length);
        },
        mixins: [SetIntervalMixin], // Use the mixin
        componentDidMount: function() {
            this.setInterval(this.ticker, 20); // Call a method on the mixin
        },
        ticker: function() {
            this.setState({
                myTicker: this.state.myTicker+1
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
            var divStyle = {
                position: 'fixed'
            };

            var sinTable;
            if(!this.props.sinTable){
                sinTable = this.fastSin(4096);
                this.props.sinTable = sinTable;
            }
            sinTable = this.props.sinTable; if(!sinTable) return (<div></div>);

            var pageWidth = document.getElementById("fastsin").offsetWidth,
                x=this.state.myTicker;

            var drawGraph = function(color, distance, ang, freq, height) {
                var height2 = height * 2, divs = [];
                for (var i = 0; i < pageWidth/distance; i++) {
                    var hue;
                    if(!color)
                        hue = 'rgb(' + (Math.floor(Math.random() * 40)) + ',' + (Math.floor(Math.random() * 40)) +
                        ',' + (Math.floor(Math.random() * 40)) + ')';
                    else
                        hue = color;
                    var barStyle={
                        top: 160 - height + sinTable[(ang + (i * freq)) & 4095] * height + 'px',
                        height: height2 + 'px',
                        position:'absolute',
                        width:'4px',
                        backgroundColor:hue,
                        left:i*distance+'px',
                        opacity:'0.4'
                    };
                    divs.push(<div key={i} style={barStyle}></div>);
                }
                return divs;
            };
            var pi=Math.PI;
            divs=drawGraph('#F1E3AD', 4,x * 50, 32 - (Math.sin((x * 20 * pi) / 2048) * 16), 50 - (Math.sin((x * 10 * pi) / 2048) * 20));
            return (
                <div ref="myDiv" style={divStyle}>
                    {divs}
                </div>
            )
        }
    });

module.exports = FastSin;
