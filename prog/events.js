// closure!
var scene_render = (function () {
    var start;
 
    return function (time) {
       if (start === undefined)
          start = time;
       const elapsed = time - start;
       start = time
 
       // graph.step(elapsed)
       gl.clear(gl.COLOR_BUFFER_BIT);

       gl.uniform1f(gl.loc.points, 0)
       gl.drawArrays(gl.LINES, 0, points.length/3)
       gl.uniform1f(gl.loc.points, 1)
       gl.drawArrays(gl.POINTS, 0, points.length/3)

 
       let err = gl.getError()
       if(err) {
          console.log(err)
       }
       requestAnimationFrame(scene_render);
    }
 })();

function setupListeners() {
    /*
        sets up pointer lock/mouse handling 
        + camera controls
    */
    document.onpointerlockchange = (event) => {
        hasPointerLock = document.pointerLockElement === canvas || document.mozPointerLockElement === canvas
    };
    
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    
    hasPointerLock = false;
    canvas.onclick = function () {
        if(!hasPointerLock) { // acquire lock
            canvas.requestPointerLock();
        } else { // support click-to-exit
            document.exitPointerLock()
        }
    };

    const turnSpeed = 2.0;
    document.onmousemove = function (e) {
        if(!hasPointerLock) {
            return; 
        }
        let vecY = [camera.mat.elements[1], camera.mat.elements[5], camera.mat.elements[9]]
        let vecX = [camera.mat.elements[0], camera.mat.elements[4], camera.mat.elements[8]]
        camera.mat.rotate(e.movementX/turnSpeed, ...vecY);
        camera.mat.rotate(e.movementY/turnSpeed, ...vecX);
        gl.uniformMatrix4fv(camera.loc, false, camera.mat.elements);
    };
    
}   