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
