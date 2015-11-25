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
function map($rootScope, $timeout, StatsService) {

  return {
    restrict: 'E',
    templateUrl: 'directives/map.html',
    replace: true,

    link: (scope, element) => {
      $rootScope.mapMode = 'flux';

      scope.mapIsInit = false;
      scope.isRetracted = false;
      scope.mapGroundStyle = {};
      scope.mapGroundGroupStyle = {};

      const fluxData = StatsService.getFlux();
      const expensesData = StatsService.getExpenses();

      const mapGround = element[0].querySelectorAll('.map--below .map-ground');
      const pixiOptions =  {
        flux: fluxData,
        expenses: expensesData
      }

      let pixiMap = {};
      let mapTl = {};

      // Init
      $timeout(()=>{
        scope.initMap();
      },0)

      // Listeners
      scope.$on('showSidebar', (ev, arg) => {
        scope.isRetracted = true;
      });
      scope.$on('hideSidebar', (ev, arg) => {
        scope.isRetracted = false;
      });

      // Watchers
      $rootScope.$watch('mapMode', (newVal) =>{
        if(newVal !== 'flux') {
          pixiMap.stopFluxMap();
        }
        switch (newVal) {
          case 'flux':
            if(pixiMap.fluxMapTlInit){
              pixiMap.playFluxMap();
            }
            break;
          case 'hebergement':

            break;
          case 'restauration':

            break;
          case 'transport':

            break;
          case 'shopping':

            break;
          case 'total':

            break;

          default:

        }
      }, true);

      /**
       * @method
       * @name initMap
       * @description Initialisation of gsap tl for map and create pixi canvas
       */
      scope.initMap = () => {
        mapTl = new TimelineMax({paused: true, onComplete: ()=> {
          scope.mapIsInit = true;
          pixiMap = new PixiMap(pixiOptions);
          mapTl.kill();

          scope.colorateMap();
        }});

        mapTl.staggerFromTo(mapGround, 0.5, {scale:1.5, opacity:0}, { scale: 1, opacity: 1, ease: Cubic.easeOut}, 0.008);
        scope.colorateMap();
        mapTl.play();
      };

      /**
       * @method
       * @name colorateMap
       * @description Change color of contry based on tourism data
       */
      scope.colorateMap = () => {
        for (let i = 0; i < fluxData.length; i++) {
            const name = fluxData[i].name;
            const number = fluxData[i].number;
            const opacity = fluxData[i].number / 994288;
            const h = (fluxData[i].number / 994288) * 20 + 165;
            const s = (fluxData[i].number / 994288) * 20 + 85 + '%'  ;
            scope.mapGroundStyle[name] = {
              fill: 'hsla(' + h +  ',' + s + ',   26%, 1)'
            };
          };
      }
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


    }
  };
}

export default {
  name: 'map',
  fn: map
};
