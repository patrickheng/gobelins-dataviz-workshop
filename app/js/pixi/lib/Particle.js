import {Sprite} from 'pixi.js';
import NumberUtils from './utils/number-utils';

export default class Particle extends Sprite {

    /**
     * @constructor
     * @param {object} options - Options of the particule
     */
    constructor(options) {
        console.log('options', options);
        super();

        this.x = options.pos.x;
        this.y = options.pos.y;

        this.texture = PIXI.Texture.fromImage(options.particleTexture);
    }

    /**
     * @method
     * @name reset
     * @description Update called by a request animation frame
     * @param {float} dt - Delta time between two update
     * @param {float} audioData - Audio data senf from emitter
     */
    update(dt) {


    }

}