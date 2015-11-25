'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, $sceDelegateProvider) {

  $locationProvider.html5Mode(true);
  // For production - remove angular debug info
  // $compileProvider.debugInfoEnabled(false);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Les touristes à Paris'
  });

  $urlRouterProvider.otherwise('/');

  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://hengpatrick.fr/**',
      'http://dataviz.hengpatrick.fr/**',
      'http://syntec.hengpatrick.fr/**',
      'http://facebook.com/**',
      'http://localhost/**',
  ]);
}

export default OnConfig;
