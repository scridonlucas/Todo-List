import Project from './Project';
import Task from './Task';
import { saveData, retrieveData, removeData } from './Storage';
import { format } from 'date-fns';

const AppLogic = (() => {
  function createProject(projectName) {
    //Cream un proiect nou si il introducem in localStorage
    if (localStorage.getItem(projectName)) {
      alert(`Project ${projectName} already exists`);
    } else {
      saveData(new Project(`${projectName}`));
    }
  }

  function createTask(title, description, dueDate, priority) {
    return new Task(
      title.value,
      description.value,
      format(new Date(dueDate.value), 'yyy-MM-dd'),
      priority.value
    );
  }

  function addTasktoProject(projectName, task) {
    const project = retrieveData(projectName);
    project.setTask(task);
    saveData(project);
  }

  function removeTaskfromProject(projectName, task) {
    const project = retrieveData(projectName);
    project.setTasks(project.removeTask(task));
    saveData(project);
  }

  function getTaskName(task) {
    return task.getTitle();
  }

  function getTaskDate(task) {
    return task.getDate();
  }

  function getProjectName(project) {
    return project.getName();
  }

  function removeProject(projectName) {
    removeData(projectName);
  }

  return {
    createProject,
    createTask,
    addTasktoProject,
    getTaskName,
    getTaskDate,
    getProjectName,
    removeProject,
    removeTaskfromProject,
  };
})();

export default AppLogic;
