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


   let camera_loc = gl.getUniformLocation(gl.program, "camera");
   let camera_mat = new Float32Array(16);
   //init matrix
   camera_mat[0] = 1.0;
   camera_mat[5] = 1.0;
   camera_mat[10] = 1.0;
   camera_mat[15] = 1.0;

   gl.uniformMatrix4fv(camera_loc, false, camera_mat);

   //let's set up a sample points
   let pointsBuf = gl.createBuffer();

   let points = new Float32Array([0.5, 0.0, 0.5,
                                  0.0, 0.0, 0.0]); //need populate
   
   console.log(points.length, points)

   let attribPointer = gl.getAttribLocation(gl.program, "aVertexPosition");
   
   gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

   gl.vertexAttribPointer(attribPointer, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(attribPointer);

   gl.drawArrays(gl.POINTS, 0, points.length/3)

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
