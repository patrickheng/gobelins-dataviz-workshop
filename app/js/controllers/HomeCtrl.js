'use strict';
import 'gsap';
import PxLoader from 'pxloader-browserify';

function HomeCtrl(ProjectsService, $scope, $rootScope, $timeout) {

  // ViewModel
  const vm = this;


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
