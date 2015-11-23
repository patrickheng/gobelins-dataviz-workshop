'use strict';

function ProjectsService() {

  const service = {};

  service.projects = [
  
  ];

  service.get = () => {
    return service.projects;
  };

  return service;

}

export default {
  name: 'ProjectsService',
  fn: ProjectsService
};
