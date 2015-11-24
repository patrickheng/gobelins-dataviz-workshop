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

        this.particulesNumber = options.particlesNumber;

        this.sourcePosition = options.sourcePosition;
        this.targetPosition = options.targetPosition;

        this.scene = options.scene;

        this.speed = 3000 / this.particulesNumber;

        this.throw(Particle, options);

        this.generateTl();
    }

    generateTl() {
        this.tl = new TimelineMax({repeat: -1});
        this.tl
            .staggerTo(this.particles, this.speed,
                {
                    bezier:[{x: this.sourcePosition.x, y: this.sourcePosition.y},
                        {x: this.sourcePosition.x / 2, y: this.sourcePosition.y/10},
                        {x: this.targetPosition.x, y: this.targetPosition.y}],
                    ease:Power1.easeOut
                }
            , 200 / this.particulesNumber);
    }

    /**
     * @method
     * @name onResize
     * @description onResize handler
     * @param {object} updateVal - New position of points
     */
    onResize(updateVal) {

        this.sourcePosition = updateVal.sourcePosition;
        this.targetPosition = updateVal.targetPosition;

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].x = updateVal.sourcePosition.x;
            this.particles[i].y = updateVal.sourcePosition.y;
        }
        this.tl.kill();
        this.generateTl();
    }

    /**
     * @method
     * @name update
     * @description Update called by a request animation frame
     */
    update() {

    }
}
