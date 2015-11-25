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
      scope.isShow = false;

      // Listeners
      scope.$on('showSidebar', (ev, arg) => {
        scope.isShow = true;
      });
      scope.$on('hideSidebar', () => {
        scope.hideSidebar();
      });

      /**
       * @method
       * @name hideSidebar
       * @description Hide the sidebar and broadcast event
       */
      scope.hideSidebar = () => {
        scope.isShow = false;
        $rootScope.$broadcast('hideSidebar');
        $rootScope.$broadcast('removeAllCountries');
      }
    }
  }
}

export default {
  name: 'sidebar',
  fn: sidebar
};
