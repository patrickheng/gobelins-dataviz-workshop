import Scene from './scene';
import raf from 'raf';
import 'gsap';
import {
    Graphics, Sprite, Container
}
from 'pixi.js';

import NumberUtils from './lib/utils/number-utils';
import ParticlesEmitter from './lib/ParticlesEmitter';

class PixiMap {
  /**
   * @constructor
   */
  constructor(options) {
    // Calculate time
    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.flux = options.flux;
    this.expenses = options.expenses;

    this.container = document.querySelector('.map');
    this.containerBoundingBox = this.container.getBoundingClientRect();
    this.width = this.containerBoundingBox.width;
    this.height = this.containerBoundingBox.height;


    // Init base classes
    this.scene = new Scene();

    this.backgroundReady = false;
    this.projectIndex = 0;
    this.particlesEmitters = [];

    for (let i = 0; i < this.flux.length; i++) {
      const options = {
        scene: this.scene,
        particlesNumber: Math.floor(this.flux[i].number / 1000),
        particleTexture: '/images/pixi/particle.png',
        pos: {
          x: this.flux[i].posX,
          y:this.flux[i].posY
        }
      }
      const pEmit = new ParticlesEmitter(options);
    }
    //

    // Render pixi view
    let root = document.body.querySelector('#map-canvas-container');
    root.appendChild(this.scene.renderer.view);


    // Launch raf
    this.update();
    this.addListeners();
  }

  /**
   * @method
   * @name addListeners
   * @description Add event listener
   */
  addListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
  }


  /**
   * @method
   * @name update
   * @description Update scene via raf
   */
  update() {

    this.DELTA_TIME = Date.now() - this.LAST_TIME;
    this.LAST_TIME = Date.now();

    // this.particlesEmitter.update();

    this.scene.render();

    raf(this.update.bind(this));

  }

  /**
   * @method
   * @name onResize
   * @description Triggered when window is resized
   * @param {object} evt
   */
  onResize(evt) {

    this.containerBoundingBox = this.container.getBoundingClientRect();
    this.width = this.containerBoundingBox.width;
    this.height = this.containerBoundingBox.height;

    this.scene.resize(this.width, this.height);
  }
}

export default PixiMap;
