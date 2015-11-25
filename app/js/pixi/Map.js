import Scene from './scene';
import raf from 'raf';
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
    this.fluxMapTlInit = false;

    this.flux = options.flux;
    this.expenses = options.expenses;

    this.container = document.querySelector('.map');
    this.containerBoundingBox = this.container.getBoundingClientRect();

    this.startFluxMap();

    // Render pixi view
    let root = document.body.querySelector('#map-canvas-container');
    root.appendChild(this.scene.renderer.view);

    // Launch raf
    this.addListeners();
  }

  /**
   * @method
   * @name startFluxMap
   * @description Init / switch to flux map
   */
  startFluxMap() {
    this.fluxMapTlInit = true;
    this.updateToggle = true;
    this.width = this.containerBoundingBox.width;
    this.height = this.containerBoundingBox.height;

    this.scene = new Scene();

    this.projectIndex = 0;
    this.particlesEmitters = [];

    for (let i = 0; i < this.flux.length; i++) {
      const options = {
        scene: this.scene,
        particlesNumber: Math.floor(this.flux[i].number / 2000),
        particleTexture: '/images/pixi/tiret.png',
        sourcePosition: {
          x: this.flux[i].posX * this.width / 100,
          y: this.flux[i].posY * this.height / 100
        },
        targetPosition: {
          x: 10.5 * this.width / 100,
          y: 33 * this.height / 100
        },
        distance: this.flux[i].distance,
        color: 0xFFFFFF
      }
      const pEmit = new ParticlesEmitter(options);

      this.particlesEmitters.push(pEmit);

      this.update();
    }
  }

  /**
   * @method
   * @name playFluxMap
   * @description play flux map
   */
  playFluxMap() {
    this.updateToggle = true;
    for (let i = 0; i < this.particlesEmitters.length; i++) {
      this.particlesEmitters[i].playTl();
    }
    this.update();
  }

  /**
   * @method
   * @name stopFluxMap
   * @description stopFluxMap
   */
  stopFluxMap() {
    this.updateToggle = false;
    for (let i = 0; i < this.particlesEmitters.length; i++) {
      this.particlesEmitters[i].stopTl();
    }
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

    this.scene.render();

    if(this.updateToggle)
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
