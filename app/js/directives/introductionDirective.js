'use strict';

/**
 * @ngdoc directive
 * @name introduction
 * @requires
 * @module app
 * @restrict E
 */
function introduction($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/introduction.html',
    replace: true,

    link: (scope, element) => {

      scope.goToMap = () => {
        $rootScope.$broadcast('goToMap');
      }
    }
  };
}

export default {
  name: 'introduction',
  fn: introduction
};
