'use strict';
import 'gsap';
import '../vendors/pointer_events_polyfill';

function HomeCtrl($scope, $rootScope, $timeout) {

  // ViewModel
  const vm = this;

  // PointerEventsPolyfill.initialize({});

  /**
   * @method
   * @name loadeImages
   * @description Preload Images
   * @param {function} callback - Callback function after loadImages
   */
  vm.loadImages = (callback) => {

  }
}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
