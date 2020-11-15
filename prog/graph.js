'use strict';

class Graph_GL {
    /*
     
        Class for managing display of this


    */
    static ANIMATION_DURATION = 5

    constructor(sources,sinks,flows) {
        this.sources = sources
        this.sinks = sinks
        this.flows = flows

        // 
        this.changes = []
    }

    add_changes(change) {
        this.changes.push(change)
    }

    /*
        execute all queued animations so far
        blocking function
        takes time elapsed
    */
    step(elapsed) {
        for(i in this.changes) {

            if(this.changes[i].duration <= 0) {
                // remove, but ideally would have list sorted by duration remaining?
                this.changes.splice(i,1)
            }

        }
         
    }

}

class Connection {

}

class Node {
    
}