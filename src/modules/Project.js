export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTask(task) {
    this.tasks.push(task);
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  removeTask(removedTaskName) {
    return this.tasks.filter((task) => task.title != removedTaskName);
  }

  getTasks() {
    return this.tasks;
  }
}
