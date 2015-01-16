var COLOR;
var SIZE;

var drawr = (function (COLOR, SIZE) {

    var my = {};

    my.start = function (id) {

        var canvas_id = document.getElementById(id);
        var context = canvas_id.getContext('2d');

        /* scaling bug fix */

		canvas_id.width = window.innerWidth;
		canvas_id.height = window.innerHeight;

        //create some utilities for draw function to use
        var localPen = {};
        var drawing = false;
        var canvasPos = {
            x: canvas_id.offsetLeft,
            y: canvas_id.offsetTop
        };

	//touch events

		canvas_id.addEventListener('touchstart', function (e) {

		e.preventDefault();

            if (COLOR !== undefined && SIZE !== undefined) {

                console.log(COLOR + " " + SIZE);
                drawing = true;
                console.log(drawing);
                localPen.x = e.targetTouches[0].pageX - canvasPos.x;
                localPen.y = e.targetTouches[0].pageY - canvasPos.y;

            } else {

                console.log('no drawing properties set');
                return;

            }

        });

        canvas_id.addEventListener('touchmove', function (e) {

	    e.preventDefault();

            var drawTo = {
                x: e.targetTouches[0].pageX - canvasPos.x,
                y: e.targetTouches[0].pageY - canvasPos.y
            }
            if (drawing) {
                drawr.ctx(localPen.x, localPen.y, drawTo.x, drawTo.y, COLOR, SIZE, context);
            }

            localPen.x = drawTo.x;
            localPen.y = drawTo.y;
        });


        canvas_id.addEventListener('touchend', function (e) {

	     e.preventDefault();

            drawing = false;
        });


	//mouse events


        canvas_id.addEventListener('mousedown', function (e) {

            if (COLOR !== undefined && SIZE !== undefined) {

                console.log(COLOR + " " + SIZE);
                drawing = true;
                console.log(drawing);
                localPen.x = e.pageX - canvasPos.x;
                localPen.y = e.pageY - canvasPos.y;

            } else {

                console.log('no drawing properties set');
                return;

            }

        });

        canvas_id.addEventListener('mousemove', function (e) {
            var mouseTo = {
                x: e.pageX - canvasPos.x,
                y: e.pageY - canvasPos.y
            }
            if (drawing) {
                drawr.ctx(localPen.x, localPen.y, mouseTo.x, mouseTo.y, COLOR, SIZE, context);
            }

            localPen.x = mouseTo.x;
            localPen.y = mouseTo.y;
        });


        canvas_id.addEventListener('mouseup', function (e) {
            drawing = false;
        });

        canvas_id.addEventListener('mouseleave', function (e) {
            drawing = false;
        });


    };

    my.draw = function (c, s) {
        COLOR = c;
        SIZE = s;
        //console.log(COLOR + " " + SIZE);
    };

    my.ctx = function (a, b, x, y, dLineColor, dLineWidth, ctx) { //lineWidth & lineColor are optional; defaults are 1px & 'black'
        var context = ctx;
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(a, b);
        context.lineTo(x, y);
        context.closePath();
        context.strokeStyle = dLineColor;
        context.lineWidth = dLineWidth;
        context.stroke();

    };

    return my;

}(COLOR, SIZE));
