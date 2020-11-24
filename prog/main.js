'use strict';

var gl; // WebGL context
var graph; // graph object

// closure!
var scene_render = (function () {
   var start;

   return function (time) {
      if (start === undefined)
         start = time;
      const elapsed = time - start;
      start = time

      graph.step(elapsed)
      requestAnimationFrame(scene_render);
   }
})();

function main() {
   setup();

   resizeCanvas();
   clearCanvas();

   // call w/ testcase
   // should replace with user input sometime
   let entrances = [0, 1];
   let exits = [4, 5];
   let paths = [
      [0, 0, 4, 6, 0, 0],
      [0, 0, 5, 2, 0, 0],
      [0, 0, 0, 0, 4, 4],
      [0, 0, 0, 0, 6, 6],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
   ];

   graph = new MaxflowGraphGL(entrances, exits, paths)

   // window.requestAnimationFrame(scene_render)

   //let's set up a sample point
   let pointsBuf = gl.createBuffer();
   let points = [0.0, 0.0, 0.0]; //need populate

   let attribPointer = gl.getAttribLocation(gl.program, "aVertexPosition");
   
   gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

   gl.vertexAttribPointer(attribPointer, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(attribPointer);

   //error from here: no valid shader
   gl.drawArrays(gl.POINTS, 0, points.length)

}

function resizeCanvas() {
   canvas.height = document.body.clientHeight;
   canvas.width = document.body.clientWidth;
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function clearCanvas() {
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
