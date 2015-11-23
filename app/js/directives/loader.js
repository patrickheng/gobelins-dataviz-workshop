'use strict';

/**
 * @ngdoc directive
 * @name loader
 * @requires
 * @module app
 * @restrict E
 */
function loader() {

  return {
    restrict: 'E',
    templateUrl: 'directives/loader.html',
    replace: true,

    link: (scope, element) => {

    }
  };
}

export default {
  name: 'loader',
  fn: loader
};
