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

    document.onmousemove = function (e) {
        if(!hasPointerLock) {
            return; 
        }
        let vecY = [camera.mat.elements[1], camera.mat.elements[5], camera.mat.elements[9]]
        let vecX = [camera.mat.elements[0], camera.mat.elements[4], camera.mat.elements[8]]
        camera.mat.rotate(e.movementX, ...vecY);
        camera.mat.rotate(e.movementY, ...vecX);
        gl.uniformMatrix4fv(camera.loc, false, camera.mat.elements);
    };
    
}   