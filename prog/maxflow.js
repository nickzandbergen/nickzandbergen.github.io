'use strict';

function push_relabel(sources, sinks, adjacency) {
   const vertices = adjacency.length;

   let helper = Array.from(new Array(vertices).keys());

   let flow = helper.map((_) => new Uint16Array(vertices));

   let height = new Uint16Array(vertices);
   let excess = new Uint16Array(vertices);

   // console.log("Height", height)
   // console.log("Excess", excess)
   // console.log("Flow", flow)
   // console.log("adjacency", adjacency)

   //remove antiparallel edges
   for (let v = 0; v < vertices; v++) {
      for (let u = 0; u < v; u++) {
         if (adjacency[v][u]) {
            flow[u][v] += adjacency[v][u];
            adjacency[u][v] += adjacency[v][u];
            adjacency[v][u] = 0;
         }
      }
   }

   // topo sort here?

   function getNeighbors(u) {
      let a = [];
      for (let v = 0; v < vertices; v++) {
         if (adjacency[u][v] || adjacency[v][u]) {
            a.push(v);
         }
      }
      return a;
   }
   
   let nodes = helper.filter((v, i) => !(sinks.includes(i) || sources.includes(i)));

   let neighbors = helper.map(getNeighbors);

   //saturate edges out of sources
   for (let e of sources) {
      height[e] = vertices;
      for (let v of neighbors[e]) {
         excess[v] += adjacency[e][v] - flow[e][v];
         flow[e][v] = adjacency[e][v];
      }
   }

   //functions
   function push(u, v) {
      let m = 0;
      if (adjacency[u][v]) {
         m = Math.min(excess[u], adjacency[u][v] - flow[u][v]);
         flow[u][v] += m;
      } else {
         //pushing back against the flow
         m = Math.min(excess[u], flow[v][u]);
         flow[v][u] -= m;
      }
      console.log("Pushing",m, u, "->", v);
      // delta here

      excess[u] -= m;
      excess[v] += m;
   }

   function relabel(u) {
      let min = Math.min(
         ...neighbors[u].filter((v) => adjacency[u][v] - flow[u][v] || flow[v][u]).map((v) => height[v])
      );

      console.log("relabeled",u,"to",min+1);
      
      
      height[u] = 1 + min;
   }

   function discharge(u) {
      console.log("discharging", u, "excess:", excess[u]);
      while (excess[u] > 0) {
         for (let v of neighbors[u]) {
            if (height[u] == height[v] + 1 && (adjacency[u][v] - flow[u][v] || flow[v][u])) {
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

   let f = function add_deltas() {
      while (n < nodes.length) {
         let u = nodes[n];
         let old_height = height[u];
         discharge(u);
         if (height[u] > old_height) {

            console.log("height change: ", height[u] - old_height);
            
            nodes.unshift(nodes.pop(n));

            n = 0;
            
            
            // need to represent deltas here somehow?
            
            return true;
         } else {
            n += 1;
         }
         
         console.log("Height", height)
         console.log("Excess", excess)
         console.log("Flow", flow)
         console.log("adjacency", adjacency)
         console.log("Nodes", nodes)
      }

      return false;
   };

   // return sinks.map((x) => excess[x]).reduce(a, (b) => a + b);
   // need to return a function that generates the next delta
   return f;
}
