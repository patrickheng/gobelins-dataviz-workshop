'use strict';

/**
 * @ngdoc directive
 * @name countrySelection
 * @requires
 * @module app
 * @restrict E
 */
function countrySelection($rootScope, $timeout) {

  return {
    restrict: 'E',
    templateUrl: 'directives/country-selection.html',
    replace: true,

    link: (scope, element) => {
      scope.step = "no-selection";

      // Listeners
      scope.$on('selectCountry', (ev, arg) => {
        scope.selectContry(arg);
      });
      scope.$on('removeAllCountries', () => {
        scope.removeAllCountries();
      });


      // Watchers
      $rootScope.$watch('selectedCountry', (newVal, oldVal) => {

        if(newVal.length <= 0) {
          scope.step = "no-selection";
        } else if(newVal.length === 1) {
          scope.step = "learn-more";
        } else {
          scope.step = "compare";
        }
      }, true);

      /**
       * @method
       * @name selectContry
       * @description Add country to array
       */
      scope.selectContry = (country) => {
        if($rootScope.selectedCountry.indexOf(country) === -1) {
          $rootScope.selectedCountry.push(country);
        }
      };

      /**
       * @method
       * @name removeCountry
       * @description Remove a country from selection list
       * @param {string} country - Remove a country named by that string
       */
      scope.removeCountry = (country) => {
        const index = $rootScope.selectedCountry.indexOf(country);
        $rootScope.selectedCountry.splice(index, 1);
      };

      /**
       * @method
       * @name removeAllCountries
       * @description Remove all selected countries
       */
      scope.removeAllCountries = () => {
        $timeout(()=> {
          $rootScope.selectedCountry = [];
        }, 0);
      };

      /**
       * @method
       * @name showSideBar
       * @description Show sidebar
       */
      scope.showSidebar = () => {
        $rootScope.$broadcast('showSidebar');
      };

    }
  }
}

export default {
  name: 'countrySelection',
  fn: countrySelection
};
