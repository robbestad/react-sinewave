/** @jsx React.DOM */

'use strict';
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
                windowWidth: window.innerWidth,
                tick: 1,
                up:1
            }
        },
        getDefaultProps: function (){
            return{
                sinTable: false
            }
        },
        mixins: [SetIntervalMixin], // Use the mixin
        componentDidMount: function() {
            this.setInterval(this.tick, 1); // Call a method on the mixin
        },
        tick: function() {
            //if(this.state.windowWidth !== window.innerWidth){
            //    this.replaceState({windowWidth:window.innerWidth})
            //}
            //
            //
            //if(this.state.tick>100 && !this.state.up){
            //    var tick=-2
            //    if(tick<=0){
            //        var up=1
            //    }
            //    this.setState({tick:this.state.tick+=tick, up:up})
            //} else {
            //    tick=2
            //    if(tick>=100){
            //        var up=0
            //    }
            //    this.setState({tick:this.state.tick+=tick, up:up})
            //}

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

            var x = 0, sinTable = this.fastSin(4096), pageWidth = window.innerWidth;
            var $drawTarget = $('#draw-target'), divs = this.draw();
            $drawTarget.css("width",!this.state.windowWidth ? window.innerWidth : this.state.windowWidth+"px");

            $drawTarget.append(divs);
            var bars = $drawTarget.children();
            var drawGraph = function(ang, freq, height) {
                var height2 = height * 2;
                for (var i = 0; i < pageWidth; i++) {
                    bars[i].style.top = 200 - height + sinTable[(ang + (i * freq)) & 4095] * height + 'px';
                    bars[i].style.height = height2 + 'px';
                }
            };
            //x=this.state.tick;
            setInterval(function(){
            drawGraph(x * 150, 32 - (sinTable[(x * 20) & 4095] * 16), 50 - (sinTable[(x * 10) & 4095] * 20));
            x++;
            },20)


            return (
                <div style={myStyle} dangerouslySetInnerHTML={{__html: divs}}></div>
                )
        }
    });

module.exports = FastSin;
