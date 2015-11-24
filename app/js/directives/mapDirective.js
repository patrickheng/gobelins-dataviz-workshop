'use strict';
import 'gsap';
import PixiMap from '../pixi/Map';

/**
 * @ngdoc directive
 * @name map
 * @requires
 * @module app
 * @restrict E
 */
function map($rootScope, StatsService) {

  return {
    restrict: 'E',
    templateUrl: 'directives/map.html',
    replace: true,

    link: (scope, element) => {
      scope.mapIsInit = false;

      let pixiMap = {};

      const pixiOptions =  {
        flux: StatsService.getFlux(),
        expenses: StatsService.getExpenses()
      }

      const mapGround = element[0].querySelectorAll('.map--below .map-ground');

      const tl = new TimelineMax({onComplete: ()=> {
        scope.mapIsInit = true;
        pixiMap = new PixiMap(pixiOptions);
        scope.$apply();
      }});

      tl.staggerFromTo(mapGround, 0.5, {scale:1.5, opacity:0}, { scale: 1, opacity: 1, ease: Cubic.easeOut}, 0.008);
    }
  };
}

export default {
  name: 'map',
  fn: map
};
