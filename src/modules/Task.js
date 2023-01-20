export default class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setTitle(title) {
    this.title = title;
  }

  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  getTitle() {
    return this.title;
  }

  getDate() {
    return this.dueDate;
  }
}
