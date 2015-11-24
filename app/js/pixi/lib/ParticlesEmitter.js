import EmitterBase from './EmitterBase';
import NumberUtils from './utils/number-utils';
import Particle from'./Particle';
import 'gsap';

export default class ParticlesEmitter extends EmitterBase {

    /**
     * @constructor
     * @inherits EmitterBase
     * @param {object} options - Options for emmiter and particle class
     */
    constructor(options) {
        super();

        this.scene = options.scene;

        this.throw(Particle, options);

        this.generateTl();
    }

    generateTl() {
        this.tl = new TimelineMax({repeat: -1, yoyo: true});
        // this.tl
        //     .staggerTo(this.particles, 5, {bezier:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], ease:Power1.easeInOut}, 0.5);
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     */
    update() {

    }
}
