'use strict';
import PixiMap from '../pixi/Map';
import findWhere from 'lodash.findwhere';
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
      scope.hoveredData = [];
      scope.isHovered = false;
      scope.hoveredTimeout = null;

      const mapGround = element[0].querySelectorAll('.map--below .map-ground');

      const pixiOptions =  {
        flux: scope.fluxData,
        expenses: scope.expensesData
      }

      let pixiMap = {};
      let mapTl = {};
      let pictoTl = {};

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
            scope.pictoData = {};
            scope.mapHoverSuffix = 'visiteurs';
          }
        } else {
          pixiMap.stopFluxMap();
          scope.pictoData = scope.getPictoData(newVal);
          scope.mapHoverSuffix = '€';

          // Animation
          $timeout(() => {
            const pictos = element[0].querySelectorAll('.map-picto');
            pictoTl = new TimelineMax();
            console.log(pictos);
            pictoTl
              .staggerTo(pictos, 0.5, {scale: 1, ease: Back.easeOut}, 0.2)
          }, 100);

        }
      }, true);

      /**
       * @method
       * @name getPictoData
       * @description Return data for displaying picto on map
       */
      scope.getPictoData = (key) => {
        let data = [];
        let maxVal = 0;

        // Get max val
        for (let i = 0; i < scope.expensesData.length; i++) {
          if(maxVal < scope.expensesData[i][key]) {
            maxVal = scope.expensesData[i][key];
          }
        }

        for (let i = 0; i < scope.expensesData.length; i++) {
          const datum = {
            country: scope.expensesData[i].name,
            value: scope.expensesData[i][key],
            style: {
              top: scope.fluxData[i].posY + '%',
              left: scope.fluxData[i].posX + '%',

              transform: 'scale(0)',
              width: (scope.expensesData[i][key] / maxVal) * 115 + 'px',
              height: (scope.expensesData[i][key] / maxVal) * 50 + 'px',
              background: 'url(images/home/' + key + '-icon.svg) center center no-repeat',
              backgroundSize: 'cover'
            }
          }
          data.push(datum);
        }
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

        mapTl.staggerFromTo(mapGround, 0.8, {scale:1.5, opacity:0}, { scale: 1, opacity: 1, ease: Cubic.easeOut}, 0.01);
        scope.colorateMap();
        mapTl.play();
      };

      /**
       * @method
       * @name colorateMap
       * @description Change color of contry based on tourism data
       */
      scope.colorateMap = () => {
        let maxVal = 0;
        // Get the max value
        for (let i = 0; i < scope.fluxData.length; i++) {
          if(maxVal < scope.fluxData[i].number) {
            maxVal = scope.fluxData[i].number;
          }
        }

        for (let i = 0; i < scope.fluxData.length; i++) {
            const name = scope.fluxData[i].name;
            const number = scope.fluxData[i].number;
            const opacity = scope.fluxData[i].number / maxVal;
            const h = (scope.fluxData[i].number / maxVal) * 20 + 165;
            const s = (scope.fluxData[i].number / maxVal) * 20 + 85 + '%'  ;
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
       * @name onMouseEnter
       * @description Mouse enter on a country
       * @param {string} country - country hovered
       */
      scope.onMouseEnter = (country) => {
        if(!scope.isRetracted) {
          scope.isHovered = true;

          scope.hoveredData.flag = 'url(images/flags/' + country + '.svg)';

          console.log(scope.hoveredData.flag);
          scope.hoveredData.name = country.replace(/([A-Z])/g, ' $1').trim();

          if($rootScope.mapMode === 'flux') {
            const obj = findWhere(scope.fluxData, {'name': country})
            scope.hoveredData.detail = obj.number + ' touristes';
          } else {
            const obj = findWhere(scope.expensesData, {'name': country})
            scope.hoveredData.detail = obj[$rootScope.mapMode] + ' €';
          }

          $timeout.cancel(scope.hoveredTimeout);
          scope.hoveredTimeout = $timeout(()=>{
            scope.isHovered = false;
          }, 20000);
        }
      };

      /**
       * @method
       * @name onMouseLeave
       * @description Mouse leave on a country
       */
      scope.onMouseLeave = () => {
        if(!scope.isRetracted) {
          $timeout.cancel(scope.hoveredTimeout);
          scope.isHovered = false;
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
