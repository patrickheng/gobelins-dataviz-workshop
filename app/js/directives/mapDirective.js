'use strict';
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


      scope.fluxData = StatsService.getFlux();
      scope.expensesData = StatsService.getExpenses();
      scope.pictoData = [];
      scope.mapHoverSuffix = 'visiteurs';

      const mapGround = element[0].querySelectorAll('.map--below .map-ground');
      const pixiOptions =  {
        flux: scope.fluxData,
        expenses: scope.expensesData
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
        if(newVal === 'flux') {
          if(pixiMap.fluxMapTlInit) {
            pixiMap.playFluxMap();
            scope.mapHoverSuffix = 'visiteurs';
          }
        } else {
          pixiMap.stopFluxMap();
          scope.pictoData = scope.getPictoData(newVal);
          scope.mapHoverSuffix = '€';
        }
      }, true);

      /**
       * @method
       * @name getPictoData
       * @description Return format data for displaying picto on map
       */
      scope.getPictoData = (key) => {
        let data = [];

        for (let i = 0; i < scope.fluxData.length; i++) {
          const datum = {
            value: scope.expensesData[i][key],
            posX: scope.fluxData[i].posX,
            posy: scope.fluxData[i].posY
          }
          data.push(datum);
        }
        console.log(data);
        return data;
      }

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
        for (let i = 0; i < scope.fluxData.length; i++) {
            const name = scope.fluxData[i].name;
            const number = scope.fluxData[i].number;
            const opacity = scope.fluxData[i].number / 994288;
            const h = (scope.fluxData[i].number / 994288) * 20 + 165;
            const s = (scope.fluxData[i].number / 994288) * 20 + 85 + '%'  ;
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
