'use strict';

/**
 * @ngdoc directive
 * @name introduction
 * @requires
 * @module app
 * @restrict E
 */
function introduction() {

  return {
    restrict: 'E',
    templateUrl: 'directives/introduction.html',
    replace: true,

    link: (scope, element) => {
    }
  };
}

export default {
  name: 'introduction',
  fn: introduction
};
