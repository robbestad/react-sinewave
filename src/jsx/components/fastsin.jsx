/** @jsx React.DOM */

'use strict';

var React = require('react'),

    FastSin = React.createClass({
        //fastSin: function(steps){
        //        var table = [],
        //            ang = 0,
        //            angStep = (Math.PI *2) / steps;
        //        do {
        //            table.push(Math.sin(ang));
        //            ang += angStep
        //        } while (ang < Math.PI * 2);
        //        return table;
        //},
        //
        render: function() {
            //var divs = '';
            //for (var i = 0; i < 480; i++) {
            //    divs +=
            //         '<div style = "position:absolute;width:1px;height:40px;'
            //         + 'background-color:#0d0; top:0px, left: '
            //         + i + 'px;"></div>';
            //}
            //var drawTarget = $('#target');
            //drawTarget.append(divs);
            //var bars = drawTarget.children();
            //var sinTable = this.fastSin(4096);
            //var x = 0;
            //
            //var drawGraph = function(ang, freq, height) {
            //    var height2 = height * 2;
            //    var sinTable = this.fastSin(4096);
            //    for (var i  = 0; i < 480; i++) {
            //        bars[i].style.top = 160 - height + sinTable[(ang + (i * freq)) & 4095] * height +'px';
            //        bars[i].style.height = height2 + 'pw';
            //    }
            //}
            //
            //setInterval(function(){
            //     this.drawGraph(x * 50, 32 - sinTable[(x * 20) & 4095] * 16),
            //         50 - (sinTable[(x * 10) & 4095] * 20)
            //})();
            var myStyle = {
                width: '480px',
                height: '320px',
                bgColor: '#000',
                position: 'relative'
            };


            var fastSin = function(steps) {
                var table = [],
                    ang = 0,
                    angStep = (Math.PI * 2) / steps;
                do {
                    table.push(Math.sin(ang));
                    ang += angStep;
                } while (ang < Math.PI * 2);
                return table;
            };

            var sinTable = fastSin(4096),
                $drawTarget = $('#draw-target'),
                bars, x = 0, pageWidth = window.innerWidth;
            var drawGraph = function(ang, freq, height) {
                var height2 = height * 2;
                for (var i = 0; i < pageWidth; i++) {
                    if(undefined !== typeof bars[i]){
                    bars[i].style.top = 200 - height + sinTable[(ang + (i * freq)) & 4095] * height + 'px';
                    bars[i].style.height = height2 + 'px';
                    }
                }
            };


            var divs = [];
            for (var i=0; i < pageWidth; i++) {
                divs += '<div style = "position:absolute;width:1px;height:0px;'
                + 'background-color:#0d0; top:280px; left: '
                + i + 'px;"></div>';
            }


            $drawTarget.append(divs);
            bars = $drawTarget.children();
            setInterval(function() {
                drawGraph(x * 150, 32 - (sinTable[(x * 20) & 4095] * 16), 50 - (sinTable[(x * 10) & 4095] * 20));
                x++;
            }, 20);

            return (
                <div style={myStyle} dangerouslySetInnerHTML={{__html: divs}}></div>
                )
        }
    });

module.exports = FastSin;
