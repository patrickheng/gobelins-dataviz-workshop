'use strict';
/**
 * @ngdoc directive
 * @name filterBar
 * @requires
 * @module app
 * @restrict E
 */
function filterBar($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/filter-bar.html',
    replace: true,

    link: (scope, element) => {
      const tl = new TimelineMax();
      const filters = element[0].querySelectorAll('.filter');
      tl.staggerFrom(filters, 0.5, {y: 100, opacity:0, ease: Back.easeOut}, 0.1, 2);
      /**
       * @method
       * @name changeMapMode
       * @description Change the mode of the mapMode
       * @param {string} newMode - New mode selected
       */
       scope.changeMapMode = (newMode) => {
         if($rootScope.mapMode !== newMode) {
           $rootScope.mapMode = newMode;
         }
       }
    }
  }
}

export default {
  name: 'filterBar',
  fn: filterBar
};
