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
        sourcePosition: {
          x: this.flux[i].posX * this.width / 100,
          y: this.flux[i].posY * this.height / 100
        },
        targetPosition: {
          x: 11.1 * this.width / 100,
          y: 33.8 * this.height / 100
        }
      }
      const pEmit = new ParticlesEmitter(options);

      this.particlesEmitters.push(pEmit);
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

    // Particules resize
    for (let i = 0; i < this.particlesEmitters.length; i++) {
      const updateVal = {
        sourcePosition: {
          x: this.flux[i].posX * this.width / 100,
          y: this.flux[i].posY * this.height / 100
        },
        targetPosition: {
          x: 11.1 * this.width / 100,
          y: 33.8 * this.height / 100
        }
      }
      this.particlesEmitters[i].onResize(updateVal);
    }

    this.scene.resize(this.width, this.height);
  }
}

export default PixiMap;
