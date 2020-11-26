function setupListeners() {
    /*
        sets up pointer lock/mouse handling 
        + camera controls
    */
    document.onpointerlockchange = (event) => {
        hasPointerLock = document.pointerLockElement === canvas || document.mozPointerLockElement === canvas
        console.log('Pointer lock changed, now', hasPointerLock);
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

    document.onmousemove = function (e) {
        if(!hasPointerLock) {
            return; 
        }
        camera.mat.rotate(e.movementX, 0.0, 1.0, 0.0);
        camera.mat.rotate(e.movementY, 1.0, 0.0, 0.0);
        gl.uniformMatrix4fv(camera.loc, false, camera.mat.elements);
    };
    
}   