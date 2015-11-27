'use strict';

import findWhere from 'lodash.findwhere';

/**
 * @ngdoc directive
 * @name sidebar
 * @requires
 * @module app
 * @restrict E
 */
function sidebar($rootScope,$timeout, StatsService) {

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

      // Listeners
      scope.$on('showSidebar', () => {
        scope.showSidebar();
      });

      scope.$on('hideSidebarFromMap', () => {
        scope.hideSidebar();
      });

      // Watchers
      $rootScope.$watch('selectedCountry', (newVal, oldVal) => {

        // If one country selected
        if(newVal.length === 1) {

          scope.sidebarTitle = "Dépense moyenne journalier d'un touriste " + nationality[$rootScope.selectedCountry[0]] + " en 2014" ;

          scope.countryGraphStyle = {
            height: '60%',
            paddingTop: '13%'
          }
        }

        // If > one country selected
        else {
          scope.sidebarTitle = "Quel nationalité dépense le plus par jour en 2014 entre :";

          const paddingTop = 20 / (newVal.length + 4.5);
          const height = 80 / (newVal.length);

          scope.countryGraphStyle = {
            height: height + '%',
            paddingTop: paddingTop + '%'
          }
        }

        scope.generateBarData();
      }, true);

      scope.generateBarData = () => {
        // Generate bar data
        scope.selectedCountryData = [];
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
            style: {
              'hebergement': (country.hebergement / scope.maxTotal) * 100 + '%',
              'restauration': (country.restauration / scope.maxTotal) * 100+ '%',
              'shopping': (country.shopping / scope.maxTotal) * 100 + '%',
              'transport': (country.transport / scope.maxTotal) * 100 + '%'
            },
            number: country

          }

          scope.selectedCountryData.push(data);
        };
      }

      // Binding escape key
      window.onkeyup = (ev) => {
        if(scope.isShow && ev.keyCode == 27) {
          scope.hideSidebar();
          scope.$apply();
        }
      }

      /**
       * @method
       * @name showSidebar
       * @description Show the sidebar and broadcast event
       */
      scope.showSidebar = () => {
        scope.isShow = true;
        $rootScope.$broadcast('sidebarIsShow');


        $timeout(()=>{
          const graphBars = document.querySelectorAll('.country-graph-bar');
          const graphBarsTotal = document.querySelectorAll('.sidebar-graph-total');
          const tl = new TimelineMax();

          tl
            .staggerFrom(graphBars, 1, {opacity:0, ease: Power2.easeOut}, 0.2, 0.5)
            .from(graphBarsTotal, 0.6, {opacity: 0, x: '-10', ease: Expo.easeOut});
        },10)

      }

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
