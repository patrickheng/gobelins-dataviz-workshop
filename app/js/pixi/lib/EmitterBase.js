import NumberUtils from './utils/number-utils';

export default class EmmiterBase {

    /**
     * @constructor
     * @param {object} scene - The current scene of Pixi
     * @param {integer} particuleNb - Number of particule to be instancieted
     */
    constructor(scene, particuleNb) {
        this.scene = scene;
        this.particlesNumber = particuleNb;

        this.poolIndex = 0;
        this.pool = [];
        this.particles = [];
    }

    /**
     * @method
     * @name throw
     * @description Instance particules
     * @param {class} classEl - The class of the particule
     * @param {obj} options - Particules options
     */
    throw(classEl, options) {
        for (let i = 0; i < options.particlesNumber; i++) {
            const p = new classEl(options);

            this.particles.push(p);

            this.scene.addChild(p);
        }
    }

    /**
     * @method
     * @name populate
     * @description Populate the pool of the emitter
     * @param {class} classEl - The class of the particule
     * @param {integer} poolLength -  Number of index in the pool
     */
    populate(classEl, poolLength) {
        for (var i = 0; i < poolLength; i++) {
            const p = new classEl();
            this.pool.push(p);
        };
    }

    /**
     * @method
     * @name takeFromPool
     * @description Take a particule from the pool
     * @return {object} - Object from pool
     */
    takeFromPool() {
        this.poolIndex = (this.poolIndex >= this.pool.length - 1) ? 0 : this.poolIndex+1;

        return this.pool[this.poolIndex];
    }
}
