'use strict';
import 'gsap';
import PxLoader from 'pxloader-browserify';
// import '../vendors/pointer_events_polyfill';

function HomeCtrl($scope, $rootScope, $timeout) {

  // ViewModel
  const vm = this;
  $scope.landingPageIsDisplay = true;
  $scope.mapIsDisplay = false;


  // Homepage init
  $timeout(()=> {
    vm.loadImages();
  }, 0);

  $scope.$on('goToMap', (ev, arg) => {
    const introductionEl = document.querySelector('.introduction');

    $scope.mapIsDisplay = true;

    const tl = new TimelineMax({onComplete: ()=>{
      $scope.landingPageIsDisplay = false;
      $scope.$apply();
    }});

    tl.to(introductionEl, 2, {y: '-100%',ease: Expo.easeOut});
  });


  $scope.$on('goToHome', (ev, arg) => {


    $scope.landingPageIsDisplay = true;

    $timeout(()=>{
      TweenMax.killAll();
      const introductionEl = document.querySelector('.introduction');

      const tl = new TimelineMax({onComplete: ()=>{
        $scope.mapIsDisplay = false;
        $scope.$apply();
      }});

      tl.fromTo(introductionEl, 1, {y: '-100%'}, {y: '0%',ease: Expo.easeOut});
    },0)



  });



  /**
   * @method
   * @name loadImages
   * @description Preload Images
   */
  vm.loadImages = () => {

    const loader = new PxLoader();
    const preloadImg = ['Allemagne', 'Belgique', 'Chine', 'Japon', 'MoyenOrient', 'RoyaumeUni', 'Russie'];

    for (let i = 0; i < preloadImg.length; i++) {
      loader.addImage('./images/flags/' + preloadImg[i] + '.svg');
    }

    loader.start();
  }
}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
