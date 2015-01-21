drawr.js
=====

A small html5 canvas drawing library focused on user (mouse/touch) input rather than programmable input.

Just include drawr.js in your html file:
`<script src="../drawr.js"></script>`

Then just make sure you have an html5 `canvas` with an id:

`<canvas id="myCanvas"></canvas>`

Hook drawr up to the id:

`drawr.start('myCanvas');`

Lastly, in the current version, start _drawring_ (input COLOR & pen SIZE):

`drawr.draw('red', 4);`


That's it! You're _drawring_ now!!

Coming Soon!
-----

* `drawr.clear();`
* `drawr.eraser();`
* `drawr.disable();`
* `drawr.start(canvasId, canvasWidth, canvasHeight);`
* `drawr.save(save_name, save_data);`
* `drawr.fill();`
* Path drawring
* Shape selector
* Layers
* touch support - added 12/9/14
