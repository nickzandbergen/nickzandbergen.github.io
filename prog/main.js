var gl;

function main() {
   gl = canvas.getContext("webgl2");

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

   var updateFn = push_relabel(entrances, exits, paths)
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
