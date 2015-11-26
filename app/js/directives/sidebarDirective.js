'use strict';

import findWhere from 'lodash.findwhere';

/**
 * @ngdoc directive
 * @name sidebar
 * @requires
 * @module app
 * @restrict E
 */
function sidebar($rootScope, StatsService) {

  return {
    restrict: 'E',
    templateUrl: 'directives/sidebar.html',
    replace: true,

    link: (scope, element) => {
      scope.isShow = false;

      scope.countryGraphStyle = {};
      scope.selectedCountryData = [];

      const expensesData = StatsService.getExpenses();

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

        // If one country selected
        if(newVal.length === 1) {

          scope.sidebarTitle = "Dépense moyenne journalier d'un touriste " + nationality[$rootScope.selectedCountry[0]] + " en 2014" ;
          
          scope.countryGraphStyle = {
            height: '60%',
            paddingTop: '15%'
          }
        }
        // If > one country selected
        else {
          scope.sidebarTitle = "Quel nationalité dépense le plus par jour en 2014 entre :";

          const paddingTop = 20 / (newVal.length + 2);
          const height = 80 / (newVal.length);
          

          scope.countryGraphStyle = {
            height: height + '%',
            paddingTop: paddingTop + '%'
          }
        }

        // Generate bar data
        scope.selectedCountryData = [];
        scope.selectedCountrySpendTotal = [];
        scope.maxTotal = 0;

        for (let i = 0; i < $rootScope.selectedCountry.length; i++) {
          const obj = findWhere(expensesData, {'name': $rootScope.selectedCountry[i]});

          if(scope.maxTotal < obj.total) {
            scope.maxTotal = obj.total;
          }
        }

        for (let i = 0; i < $rootScope.selectedCountry.length; i++) {
        
          const country = findWhere(expensesData, {'name': $rootScope.selectedCountry[i]});
          const data = {
            'hebergement': (country.hebergement / scope.maxTotal) * 100 + '%',
            'restauration': (country.restauration / scope.maxTotal) * 100+ '%',
            'shopping': (country.shopping / scope.maxTotal) * 100 + '%',
            'transport': (country.transport / scope.maxTotal) * 100 + '%',
          }

          console.log('country.total',country.total);
          scope.selectedCountryData.push(data);
          scope.selectedCountrySpendTotal.push(country.total);
        };

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
