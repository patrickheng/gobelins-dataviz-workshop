'use strict';

function OnRun($rootScope, AppSettings) {

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;

    console.log('        =====         <(^^)>            ======        ');
    console.log('Site developed with <3 by Patrick Heng - http://twitter/pat_hg');
    console.log('========     ===========================      ========');
  });

}

export default OnRun;
