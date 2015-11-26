'use strict';
import 'gsap';
import PxLoader from 'pxloader-browserify';
import '../vendors/pointer_events_polyfill';

function HomeCtrl($scope, $rootScope, $timeout) {

  // ViewModel
  const vm = this;

  // PPE Polyfill
  // PointerEventsPolyfill.initialize({});

  // Homepage init
  $timeout(()=> {
    vm.loadImages();
  }, 0);


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
