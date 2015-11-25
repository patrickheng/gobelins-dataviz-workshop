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
    }
  }
}

export default {
  name: 'filterBar',
  fn: filterBar
};
