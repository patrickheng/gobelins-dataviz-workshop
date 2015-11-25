'use strict';

/**
 * @ngdoc directive
 * @name countrySelection
 * @requires
 * @module app
 * @restrict E
 */
function countrySelection($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/country-selection.html',
    replace: true,

    link: (scope, element) => {
    }
  }
}

export default {
  name: 'countrySelection',
  fn: countrySelection
};
