'use strict';

function StatsService($http) {

  const service = {};

  service.getFlux = () => {
    return new Promise((resolve, reject) => {
      $http.get('./json/flux.json').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  service.getExpenses = () => {
    return new Promise((resolve, reject) => {
      $http.get('./json/expenses.json').success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  return service;

}

export default {
  name: 'StatsService',
  fn: StatsService
};
