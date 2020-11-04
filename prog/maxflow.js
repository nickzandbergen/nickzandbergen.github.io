'use strict';

function push_relabel(entrances, exits, path) {
   const vertices = path.length;

   let helper = Array.from(new Array(vertices).keys());

   let flow = helper.map((_) => new Uint16Array(vertices));

   let height = new Uint16Array(vertices);
   let excess = new Uint16Array(vertices);

   // console.log("Height", height)
   // console.log("Excess", excess)
   // console.log("Flow", flow)
   // console.log("Path", path)

   let deltas = [];

   //remove antiparallel edges
   for (let v = 0; v < vertices; v++) {
      for (let u = 0; u < v; u++) {
         if (path[v][u]) {
            flow[u][v] += path[v][u];
            path[u][v] += path[v][u];
            path[v][u] = 0;
         }
      }
   }

   function getNeighbors(u) {
      let a = [];
      for (let v = 0; v < vertices; v++) {
         if (path[u][v] || path[v][u]) {
            a.push(v);
         }
      }
      return a;
   }
   
   //[i for i in range(vertices) if not (i in exits or i in entrances)]
   let nodes = helper.filter((v, i) => !(exits.includes(i) || entrances.includes(i)));

   // [[v for v in range(vertices) if path[u][v] or path[v][u]] for u in range(vertices)]
   let neighbors = helper.map(getNeighbors);

   console.log("neighbors", neighbors);

   //saturate edges out of sources
   for (let e of entrances) {
      height[e] = vertices;
      for (let v of neighbors[e]) {
         excess[v] += path[e][v] - flow[e][v];
         flow[e][v] = path[e][v];
      }
   }

   //functions
   function push(u, v) {
      let m = 0;
      if (path[u][v]) {
         m = Math.min(excess[u], path[u][v] - flow[u][v]);
         flow[u][v] += m;
      } else {
         //pushing back against the flow
         m = Math.min(excess[u], flow[v][u]);
         flow[v][u] -= m;
      }
      console.log("Pushing",m, u, "->", v);
      excess[u] -= m;
      excess[v] += m;
   }

   function relabel(u) {
      let min = Math.min(
         ...neighbors[u].filter((v) => path[u][v] - flow[u][v] || flow[v][u]).map((v) => height[v])
      );
      console.log("relabeled",u,"to",min+1);
      height[u] = 1 + min;
   }

   function discharge(u) {
      // need to record deltas here
      // and return
      console.log("discharging", u, "excess:", excess[u]);
      while (excess[u] > 0) {
         for (let v of neighbors[u]) {
            if (height[u] == height[v] + 1 && (path[u][v] - flow[u][v] || flow[v][u])) {
               push(u, v);
            }
            if (excess[u] <= 0) {
               console.log("breaking")
               break;
            }
         }
         // more elegant bit here flow-control-wise?
         if (excess[u] > 0) {
            relabel(u);
         }
      }
      return;
   }
   let n = 0;

   let f = function get_deltas() {
      deltas = [];
      while (n < nodes.length) {
         let u = nodes[n];
         let old_height = height[u];
         discharge(u);
         if (height[u] > old_height) {

            console.log("height change: ", height[u] - old_height);
            
            nodes.unshift(0, nodes.pop(n));
            n = 0;
            // need to represent deltas here somehow?
            
            return true;
         } else {
            n += 1;
         }
      }

      console.log("Height", height)
      console.log("Excess", excess)
      console.log("Flow", flow)
      console.log("Path", path)
      return false;
   };

   // return exits.map((x) => excess[x]).reduce(a, (b) => a + b);
   // need to return a function that generates the next delta
   return f;
}
