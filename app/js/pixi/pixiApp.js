import Scene from './scene';
import raf from 'raf';
import 'gsap';
import {
    Graphics, Sprite, Container
}
from 'pixi.js';

import NumberUtils from './lib/utils/number-utils';


// DEV
import Dat from 'dat-gui';
import Stats from 'stats-js';

class App {
  /**
   * @constructor
   */
  constructor(projects) {
    // Calculate time
    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.projects = projects;
    this.pictures = [];

    this.pictureSize = {
      width: 1280,
      height: 750,
      ratio : 1.70666
    }

    // Build picture array
    this.pictures.push('./images/home/introduction-visual.jpg');

    for (var i = 0; i < projects.length; i++) {
      this.pictures.push('./images/home/' + projects[i].ref + '-visual.jpg');
    }

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Init base classes
    this.scene = new Scene();

    this.masks = [];
    this.mask = new Sprite();
    this.frontBackground = new Sprite();
    this.backBackground = new Sprite();
    this.backgroundReady = false;
    this.projectIndex = 0;

    // Render pixi view
    let root = document.body.querySelector('#project-background');
    root.appendChild(this.scene.renderer.view);

    this.addListeners();

    // Launch raf
    this.update();

    this.statsReady = false;

    this.addStats();
    this.addGui();

    // this.drawBackground('back', this.pictures[this.projectIndex]);
    this.setMask();
    this.drawBackground('front', this.pictures[this.projectIndex]);
    this.setBackgroundRatio();
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
   * @name drawBackground
   * @description Draw a background
   */
  drawBackground(type, image) {
    let background;

    if(type === 'front') {
      background= this.frontBackground;
    } else {
      background = this.backBackground;
    }

    this.scene.removeChild(background);

    background.texture = PIXI.Texture.fromImage(image);

    if(type === 'front') {
        background.mask = this.mask;
        console.log('set front');
    } else {
      console.log('set back');
    }

    this.scene.addChild(background);
    this.backgroundReady = true;
  }

  setBackgroundRatio() {
    const background = {};

    if(this.width/this.height > this.pictureSize.ratio) {
      background.width = this.width;
      background.height = this.width * this.pictureSize.height / this.pictureSize.width;

      background.x = 0;

      if(background.height < this.height) {
        background.y = (this.height - this.pictureSize.height);
      } else {
        background.y = 0;
      }
    } else {
      background.height = this.height;
      background.width = this.height * this.pictureSize.width / this.pictureSize.height;

      background.y = 0;

      if(background.width < this.width) {
        background.x = (this.width - this.pictureSize.width) / 2;
      } else {
        background.x = 0;
      }
    }

    this.backBackground.x = this.frontBackground.x = background.x;
    this.backBackground.y = this.frontBackground.y = background.y;
    this.backBackground.height = this.frontBackground.height = background.height;
    this.backBackground.width = this.frontBackground.width = background.width;
  }

  setMask() {
    this.maskScale = 1;
    this.mask = new Sprite();
    this.mask.texture = PIXI.Texture.fromImage('./images/home/cloud-texture4.png');
    this.mask.x = this.width/2 + NumberUtils.randomRangeInt(-100, 100);
    this.mask.y = this.height/2 + NumberUtils.randomRangeInt(-100, 100);
    this.mask.rotation = NumberUtils.randomRange(-2 * Math.PI, 2 * Math.PI);
    this.mask.scale.set(0);
    this.mask.anchor.x = 0.5;
    this.mask.anchor.y = 0.5;
    this.mask.alpha = 1;
    this.scene.addChild(this.mask);

    TweenMax.to(this, 12, {maskScale: 7, ease: Power4.easeOut});
  }

  resetMask() {
    console.info('resetMask');
    this.maskScale = 0;
    this.mask.x = this.width/2 + NumberUtils.randomRangeInt(-100, 100);
    this.mask.y = this.height/2 + NumberUtils.randomRangeInt(-100, 100);
    this.mask.rotation = NumberUtils.randomRange(-2 * Math.PI, 2 * Math.PI);
    this.mask.alpha = 1;
    this.mask.scale.set(0);
    TweenMax.fromTo(this.backBackground, 1, {alpha: 0.5}, {alpha: 0, ease: Power4.easeOut});
    TweenMax.to(this, 4, {maskScale: 7, ease: Power4.easeOut});
    this.frontBackground.mask = this.mask;
  }

  changeProject(oldVal, newVal) {
    this.projectIndex = newVal;
    TweenMax.killAll(true, true, true);
    this.resetMask();
    console.log(this.pictures[oldVal]);
    this.drawBackground('back', this.pictures[oldVal]);
    this.drawBackground('front', this.pictures[newVal]);

    this.setBackgroundRatio();

  }

  /**
   * @method
   * @name addStats
   * @description Init stats.js
   */
  addStats() {
    //Stats js
    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    this.statsReady = true;

    document.body.appendChild(this.stats.domElement);
  }

  /**
   * @method
   * @name addGui
   * @description Init dat.gui.js
   */
  addGui() {
    this.gui = new Dat.GUI();
    this.gui.close();
  }

  /**
   * @method
   * @name update
   * @description Update scene via raf
   */
  update() {

    if (this.statsReady)
      this.stats.begin();

    if(this.backgroundReady) {
      const randomIndex = NumberUtils.randomRangeInt(0,this.masks.length-1);

      this.DELTA_TIME = Date.now() - this.LAST_TIME;
      this.LAST_TIME = Date.now();

      this.mask.scale.set(this.maskScale);
      // Render
      this.scene.render();
    }

    raf(this.update.bind(this));

    if (this.statsReady)
      this.stats.end();
  }

  /**
   * @method
   * @name onResize
   * @description Triggered when window is resized
   * @param {object} evt
   */
  onResize(evt) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize(this.width, this.height);

    this.drawBackground('back', this.pictures[this.projectIndex]);
    this.setBackgroundRatio();
  }
}
export default App;
