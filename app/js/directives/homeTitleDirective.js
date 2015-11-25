'use strict';

/**
 * @ngdoc directive
 * @name homeTitle
 * @requires
 * @module app
 * @restrict E
 */
function homeTitle($rootScope) {

  return {
    restrict: 'E',
    templateUrl: 'directives/home-title.html',
    replace: true,

    link: (scope, element) => {

      const titles = {
        'flux': 'De quel pays viennent-ils ?',
        'hebergement': 'Pour combien se logent-ils ?',
        'restauration': 'Frais de restauration',
        'transport': 'Frais de transport',
        'shopping': 'Shopping et loisirs',
        'total': 'Leurs dépenses quotidiennes',
      }

      const mainTitle = element[0].querySelector('.title-container h2');

      let titleChangeTL = new TimelineMax();

      scope.isCentered = false;
      scope.homeTitle = titles.flux;

      // Listeners
      scope.$on('showSidebar', (ev, arg) => {
        scope.isCentered = true;
      });
      scope.$on('hideSidebar', (ev, arg) => {
        scope.isCentered = false;
      });

      $rootScope.$watch('mapMode', (newVal,oldVal)=>{
        console.log(newVal);
        titleChangeTL.kill();
        titleChangeTL = new TimelineMax();

        titleChangeTL
          .to(mainTitle, 0.4, {y: -100, ease: Cubic.easeOut})
          .addCallback(()=>{
            scope.homeTitle = titles[newVal];
            scope.$apply();
          })
          .fromTo(mainTitle, 0.4, {y: 200}, {y: 0, ease: Cubic.easeOut});
      }, true);

    }
  }
}

export default {
  name: 'homeTitle',
  fn: homeTitle
};
