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
      
      const nationality = {
        'Allemagne': 'allemand',
        'Belgique': 'belge',
        'Chine': 'allemand',
        'RoyaumeUni': 'anglais',
        'Japon': 'japonais',
        'MoyenOrient': 'du Moyen-Orient',
        'Russie': 'russe'
      }

      // Watchers
      $rootScope.$watch('selectedCountry', (newVal, oldVal) => {
   
        if(newVal.length === 1) {

          scope.sidebarTitle = "Dépense moyenne journalier d'un touriste " + nationality[$rootScope.selectedCountry[0]];
        } else {
          scope.sidebarTitle = "Quel nationalité de touriste dépense le plus par jour entre :";
        }
      }, true);

      // Binding escape key
      window.onkeyup = (ev) => {
        if(scope.isShow && ev.keyCode == 27) {
          scope.hideSidebar();
          scope.$apply();
        }
      }

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
