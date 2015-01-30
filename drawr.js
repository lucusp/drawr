var COLOR;
var SIZE;

var drawr = (function (COLOR, SIZE) {

    var _drawr = {};

    _drawr.start = function (canvas_params/*ex: {id: "myCanvas", w: 250, h: 250}*/ ) {

        var canvas_id = document.getElementById(canvas_params.id);
        var context = canvas_id.getContext('2d');

        /*
            scaling bug fix
            of course IE is
            freaking out over this
            // need to make default
            // settings
        */
        // *** set default height width ***
        var canvasWidth = canvas_params.w || 250;
        var canvasHeight = canvas_params.h || 250;

		canvas_id.width = canvasWidth;
		canvas_id.height = canvasHeight;

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

    //assumes that the canvases are nested
    // **** Pass in object literal ****
    // **** ex: {id: "canvas-wrapper", newId: "layer-x", classname: "layers"}
    _drawr.newLayer = function (c){

        var canvasContainer = document.getElementById(c.id);

        var newCanvasLayer = document.createElement('CANVAS');

        newCanvasLayer.className = c.classname || "";

        newCanvasLayer.id = c.newId;

        canvasContainer.appendChild(newCanvasLayer);

        _drawr.start(newCanvasLayer.id);

    };

    _drawr.colorPicker = function(color_canvas){ //pass in object literal ex: {c_id: "myCanvas", x: 25, y: 50}

        var colorCanvas = document.getElementById(color_canvas.id);
        var ccCTX = colorCanvas.getContext('2d');

        var p = ccCTX.getImageData(color_canvas.x, color_canvas.y, 1, 1).data;

            /* Convert each r, g, b value to Hex value */
            function componentToHex(c){
            	var hex = c.toString(16);
            	return hex.length == 1 ? "0" + hex : hex;
            }

            /* Take r, g, b components and combine to 1 hex value */
            function rgbToHex(r, g, b) {
            	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            }

        var selectedColor = rgbToHex(p[0], p[1], p[2]);

        return selectedColor;

    };

    /*
        DRAWING TOOLS:
        1)Path
        2)Shapes
            i) rectangles - 1/28/15
            ii) circles
    */

    _drawr.rect = function(inputs){//{canvas: 'id', x: startx, y: starty, xx: endx, yy: endy}

        var canvas = document.getElementById(inputs.canvas);
        var context = canvas.getContext('2d');

        var begPoint = {
            x: inputs.x,
            y: inputs.y
        };

        var endPoint = {
            x: inputs.xx,
            y: inputs.yy
        };

        var strokePoint = {
            x: begPoint.x,
            y: begPoint.y
        };

        var rectAttr = {
            w: endPoint.x - begPoint.x,
            h: endPoint.y - begPoint.y
        };

        if(endPoint.x < begPoint.x){

            strokePoint.x = endPoint.x;
            rectAttr.w = begPoint.x - endPoint.x;

        } else if(endPoint.y < begPoint.y){

            strokePoint.y = endPoint.y;
            rectAttr.h = begPoint.y - endPoint.y;

        }

        context.beginPath();
        context.lineWidth = inputs.lineWidth || 1;
        context.strokeStyle = inputs.lineColor || "#000";

        if(inputs.fillColor){

            context.fillStyle = inputs.fillColor;
            context.fillRect(strokePoint.x, strokePoint.y, rectAttr.w, rectAttr.h);

        } else {

            context.rect(strokePoint.x, strokePoint.y, rectAttr.w, rectAttr.h);

        }

        context.stroke();

    };

    //utils
    _drawr.draw = function (c, s) {
        COLOR = c;
        SIZE = s;
        //console.log(COLOR + " " + SIZE);
    };

    _drawr.ctx = function (a, b, x, y, dLineColor, dLineWidth, ctx) { //lineWidth & lineColor are optional; defaults are 1px & 'black'
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

    return _drawr;

}(COLOR, SIZE));
