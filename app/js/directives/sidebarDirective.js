'use strict';

/**
 * @ngdoc directive
 * @name sidebar
 * @requires
 * @module app
 * @restrict E
 */
function sidebar($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/sidebar.html',
    replace: true,

    link: (scope, element) => {
      
    }
  }
}

export default {
  name: 'sidebar',
  fn: sidebar
};
