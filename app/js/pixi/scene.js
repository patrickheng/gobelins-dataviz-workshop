import {
    WebGLRenderer, Container
}
from 'pixi.js';

class Scene {

    /**
     * @constructor
     */
    constructor() {

        this.containerBoundingBox = document.querySelector('.map').getBoundingClientRect();
        this.width = this.containerBoundingBox.width;
        this.height = this.containerBoundingBox.height;

        this.renderer = new WebGLRenderer(this.width, this.height, {
            antialias: true,
            transparent: true
        });

        this.stage = new Container();
    }

    /**
     * Add a child to the stage
     *
     * @param {Obj} child - a PIXI object
     */
    addChild(child) {

        this.stage.addChild(child)
    }

    /**
     * Remove a child from the stage
     *
     * @param {Obj} child - a PIXI object
     */
    removeChild(child) {

        this.stage.removeChild(child)
    }

    /**
     * Renders/Draw the scene
     */
    render() {

        this.renderer.render(this.stage);
    }

    /**
     * Resize the scene according to screen size
     *
     * @param {Number} newWidth
     * @param {Number} newHeight
     */
    resize(newWidth, newHeight) {

        this.renderer.resize(newWidth, newHeight)
    }

}

export default Scene;
