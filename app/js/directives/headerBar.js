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
      scope.toggleAllProjectView = () => {
        $rootScope.$broadcast('toggleAllViewProject');
      }
    }
  };
}

export default {
  name: 'headerBar',
  fn: headerBar
};
