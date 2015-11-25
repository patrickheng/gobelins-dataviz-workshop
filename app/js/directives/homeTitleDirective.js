'use strict';

/**
 * @ngdoc directive
 * @name homeTitle
 * @requires
 * @module app
 * @restrict E
 */
function homeTitle($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/home-title.html',
    replace: true,

    link: (scope, element) => {

    }
  }
}

export default {
  name: 'homeTitle',
  fn: homeTitle
};
