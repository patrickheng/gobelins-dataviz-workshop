'use strict';

/**
 * @ngdoc directive
 * @name headerBar
 * @requires
 * @module app
 * @restrict E
 */
function headerBar($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/header-bar.html',
    replace: true,

    link: (scope, element) => {
    }
  };
}

export default {
  name: 'headerBar',
  fn: headerBar
};
