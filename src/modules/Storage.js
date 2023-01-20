import Project from './Project';
import Task from './Task';

function saveData(project) {
  let project_serialized = JSON.stringify(project);
  localStorage.setItem('project', project_serialized);
}

function retrieveData(project) {
  let project_deserialized = JSON.parse(localStorage.getItem('project'));
  return project_deserialized;
}
