'use strict';
import flux from '../../json/flux';
import expenses from '../../json/expenses';

function StatsService($http) {

  const service = {};

  service.getFlux = () => {
    // return new Promise((resolve, reject) => {
    //   $http.get('/json/flux.json').success((data) => {
    //     resolve(data);
    //     console.log(data);
    //   }).error((err, status) => {
    //     reject(err, status);
    //   });
    // });

    return flux;
  };

  service.getExpenses = () => {
    return expenses;
  };

  return service;

}

export default {
  name: 'StatsService',
  fn: StatsService
};
