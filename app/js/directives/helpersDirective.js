'use strict';
/**
 * @ngdoc directive
 * @name helpers
 * @requires
 * @module app
 * @restrict E
 */
function helpers($rootScope, $timeout) {

  return {
    restrict: 'E',
    templateUrl: 'directives/helpers.html',
    replace: true,

    link: (scope, element) => {
      scope.helpersToggle = false;

      scope.$on('showHelpers', (ev, arg) => {
        scope.helpersToggle = true;
        scope.$apply();
        $timeout(()=>{
          scope.helpersToggle = false;
        }, 6000);

      });

      scope.removeHelpers = () => {
        scope.helpersToggle = false;
      }
    }
  }
}

export default {
  name: 'helpers',
  fn: helpers
};
