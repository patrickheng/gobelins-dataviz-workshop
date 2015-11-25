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
      scope.mode = 'population';

      scope.mapIsInit = false;
      scope.isRetracted = false;

      const mapGround = element[0].querySelectorAll('.map--below .map-ground');
      const pixiOptions =  {
        flux: StatsService.getFlux(),
        expenses: StatsService.getExpenses()
      }

      let pixiMap = {};
      let tl = {};


      // Listeners
      scope.$on('showSidebar', (ev, arg) => {
        scope.isRetracted = true;
      });
      scope.$on('hideSidebar', (ev, arg) => {
        scope.isRetracted = false;
      });


      /**
       * @method
       * @name initMap
       * @description Initialisation of gsap tl for map and create pixi canvas
       */
      scope.initMap = () => {
        tl = new TimelineMax({onComplete: ()=> {
          scope.mapIsInit = true;
          pixiMap = new PixiMap(pixiOptions);
          scope.$apply();
        }});

        tl.staggerFromTo(mapGround, 0.5, {scale:1.5, opacity:0}, { scale: 1, opacity: 1, ease: Cubic.easeOut}, 0.008);
      };

      /**
       * @method
       * @name selectContry
       * @description Select a specific contry
       */
      scope.selectCountry = (country) => {
        if(!scope.isRetracted) {
          $rootScope.$broadcast('selectCountry', country);
        }
      };

      /**
       * @method
       * @name hideSidebar
       * @description On click on the map hide sidebar
       */
      scope.hideSidebar = () => {
        if(scope.isRetracted) {
          $rootScope.$broadcast('hideSidebar');
        }
      };

      // Initialisation
      scope.initMap();

    }
  };
}

export default {
  name: 'map',
  fn: map
};
