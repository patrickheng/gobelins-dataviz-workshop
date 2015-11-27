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
    vm.introTl();
  }, 0);

  $scope.$on('goToMap', (ev, arg) => {
    vm.goToMap();
  });


  $scope.$on('goToHome', (ev, arg) => {
    vm.goToHome();
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

  /**
   * @method
   * @name introTl
   * @description Generate gsap tl
   */
  vm.introTl = ()=> {
    TweenMax.killAll();

    const tl = new TimelineMax();
    const segway = document.querySelector('#segway');
    const selfie = document.querySelector('#selfie-stick');
    const iphone = document.querySelector('#iphone');
    const iphoneSreen = document.querySelector('#iphone-screen');
    const eifel = document.querySelector('#eifel-tower');
    const eifelxs = document.querySelector('#eifel-tower-xs');
    const middleIllus = document.querySelector('.middle-illus');
    const btn = document.querySelector('#discover-button');

    tl
      .from(eifel, 1, {scale:0, opacity:0, ease: Expo.easeOut})
      .from(eifelxs, 1, {opacity:0, ease: Expo.easeOut}, 0)
      .from(segway, 1, {x:'-100%', opacity:0, ease: Expo.easeOut})
      .from(selfie, 1.5, {x:'-100%', y:'-100%', opacity:0, ease: Back.easeOut}, "-=0.7")
      .from(iphone, 1.5, {x:'100%', y:'100%', opacity:0, ease: Back.easeOut}, "-=0.7")
      .from(iphoneSreen, 0.2, {opacity:0, ease: SteppedEase.config(5)}, "-=0.1")
      .from(iphoneSreen, 0.2, {opacity:1, ease: SteppedEase.config(5)})
      .from(iphoneSreen, 0.2, {opacity:0, ease: SteppedEase.config(5)})
      .from(middleIllus, 1, {y: '100%', scale: 1.4, ease: Expo.easeOut}, "-=0.7")
      .fromTo(btn, 1, {y: '100%', opacity:0, scale: 1.1}, {y: '0%', scale: 1, opacity:1, ease: Back.easeOut}, "-=0.7")
  }

  /**
   * @method
   * @name goToHome
   * @description Link to landing view
   */
  vm.goToHome = () => {
    $scope.landingPageIsDisplay = true;

    $timeout(()=>{
      TweenMax.killAll();
      const introductionEl = document.querySelector('.introduction');

      const tl = new TimelineMax({onComplete: ()=>{
        $scope.mapIsDisplay = false;
        $scope.$apply();
      }});
      vm.introTl();
      tl.fromTo(introductionEl, 1, {y: '-100%'}, {y: '0%',ease: Expo.easeOut});
    },0)
  }

  /**
   * @method
   * @name goToMap
   * @description Link to map view
   */
  vm.goToMap = () => {
    const introductionEl = document.querySelector('.introduction');

    $scope.mapIsDisplay = true;

    const tl = new TimelineMax({onComplete: ()=>{
      $scope.landingPageIsDisplay = false;
      $scope.$apply();
    }});

    tl.to(introductionEl, 2, {y: '-100%',ease: Expo.easeOut});
  }

  // Binding escape key
  window.onkeyup = (ev) => {
    if($scope.landingPageIsDisplay && ev.keyCode == 40) {
        vm.goToMap();
        $scope.$apply();
    }
  }

}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
