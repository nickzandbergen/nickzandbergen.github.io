'use strict';

var gl; // WebGL context
var graph; // graph object


let start;


function scene_render(time) {
   if (start === undefined)
      start = time;
   const elapsed = time - start;
   start = time
   
   graph.step(elapsed)

   requestAnimationFrame(scene_render);

}

function main() {
   // gl = canvas.getContext("webgl2");
   const ctx = canvas.getContext('2d');
   console.log(ctx)
   ctx.fillStyle = 'blue';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.stroke()
   return


   // resizeCanvas();
   // clearCanvas();

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

   graph = new Graph_GL(entrances, exits, paths)

   var updateFn = push_relabel(entrances, exits, paths);
   let d = []
   let i = 0;

   do {
      d = updateFn()
      console.log(i++, d);
      if(i > 100) {
         break
      }
      // maybe wait on a button or something here
      // graph.render()
   } while (d);

   // window.requestAnimationFrame(scene_render)

}

function resizeCanvas() {
   canvas.height = document.body.clientHeight;
   canvas.width = document.body.clientWidth;
   // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

function clearCanvas() {
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
