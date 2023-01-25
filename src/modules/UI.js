import AppLogic from './AppLogic';
import { retrieveData } from './Storage';
import Project from './Project';

export default function loadPage() {
  if (!localStorage.getItem('Default')) {
    AppLogic.createProject('Default');
  }
  UI.loadPageDOM();
}

const UI = (() => {
  function loadPageDOM() {
    loadProjectsDashboardDOM('Default');
    displayProjectDOM('Default');
  }

  function loadProjectsDashboardDOM(selectedProject) {
    //Afisam in dashboard proiectele
    const dashboard = document.querySelector('.second-buttons');
    const divs = dashboard.querySelectorAll('div');
    divs.forEach((div) => div.remove()); // Stergem fiecare div din dashboard
    for (let i = 0; i < localStorage.length; i++) {
      // Parcurgem localStorage-ul si creeam in DOM proiectele
      createProjectDOM(localStorage.key(i));
    }

    createAddNewProjectDOM(); // Dupa ce se afiseaza proiectele se afiseaza butonul de adaugare a unui proiect nou

    const project = retrieveData(selectedProject);
    const selectedProjectName = AppLogic.getProjectName(project);
    const projects = document.querySelectorAll('.project-button');
    const addProjectBtn = document.querySelector('.add-project');

    addProjectBtn.addEventListener('click', () => {
      addInputProjectDOM(selectedProjectName);
    }); // Adaugam functionalitate butonului de adaugare proiect

    const removeProjectBtns = document.querySelectorAll('.remove-project');
    removeProjectBtns.forEach((remove) => {
      remove.addEventListener('click', (e) => {
        e.stopPropagation();
        removeProject(remove.parentNode, selectedProjectName);
      });
    });

    projects.forEach((project) => {
      const buttonName = project.querySelector('p').textContent;
      if (buttonName === selectedProjectName) {
        project.classList.add('project-button-selected');
      }
      project.addEventListener('click', handleProjectsButtons);
    });

    if (selectedProjectName === '') {
      clearMainPageDOM();
    }
  }

  function createProjectDOM(projectName) {
    //Cream un nou proiect in DOM
    const dashboard = document.querySelector('.second-buttons');
    const project = document.createElement('div');
    const img = document.createElement('img');
    const text = document.createElement('p');
    const removeBtn = document.createElement('div');
    const container = document.createElement('div');

    text.textContent = `${projectName}`;
    removeBtn.textContent = '✖';
    img.src = 'images/project.png';

    container.classList.add('task-texts');
    removeBtn.classList.add('remove-button');
    removeBtn.classList.add('remove-project');
    project.classList.add('button');
    project.classList.add('project-button');

    project.appendChild(img);
    container.appendChild(text);
    container.appendChild(removeBtn);
    project.appendChild(container);
    dashboard.appendChild(project);
  }

  function createAddNewProjectDOM() {
    //Cream un buton nou de adaugare proiecte in DOM
    let dashboard = document.querySelector('.second-buttons');
    let project = document.createElement('div');
    let img = document.createElement('img');
    let text = document.createElement('p');

    text.textContent = 'Add new project';
    img.src = 'images/add-project.png';

    project.classList.add('button');
    project.classList.add('add-project');

    project.appendChild(img);
    project.appendChild(text);
    dashboard.appendChild(project);
  }

  function addInputProjectDOM(projectName) {
    //Adaugam Input-ul prin care se creeaza proiectele in DOM
    const secondButtons = document.querySelector('.second-buttons');
    const addProjectBtn = document.querySelector('.add-project');
    const addProjectCtn = document.createElement('div');
    const input = document.createElement('input');
    const buttons = document.createElement('div');
    const addBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    addProjectBtn.remove();

    input.classList.add('project-input');
    addProjectCtn.classList.add('add-project-container');
    buttons.classList.add('add-cancel');
    addBtn.classList.add('project-add-button');
    cancelBtn.classList.add('project-cancel-button');

    input.setAttribute('type', 'text');
    input.required = true;
    addBtn.textContent = 'Add';
    cancelBtn.textContent = 'Cancel';

    buttons.appendChild(addBtn);
    buttons.appendChild(cancelBtn);
    secondButtons.appendChild(buttons);
    addProjectCtn.appendChild(input);
    addProjectCtn.appendChild(buttons);
    secondButtons.appendChild(addProjectCtn);

    addBtn.addEventListener('click', () => {
      //Cream obiectul in localStorage si afisam toate proiectele in DOM
      if (input.value) {
        AppLogic.createProject(input.value);
        loadProjectsDashboardDOM(projectName);
      } else {
        alert('Please enter a valid project name');
      }
    });

    cancelBtn.addEventListener('click', () => {
      //Reafisam DOM-ul
      loadProjectsDashboardDOM(projectName);
    });
  }

  function handleProjectsButtons() {
    const projectName = this.querySelector('p').textContent;
    loadProjectsDashboardDOM(projectName);
    displayProjectDOM(projectName);
  }

  function displayProjectDOM(projectName) {
    //Afisam proiectul selectat si task-urile aferente
    const main = document.querySelector('.main');
    const title = document.createElement('h1');
    const project = retrieveData(projectName);
    const tasksArr = project.getTasks();
    //Stergem toate elementele

    clearMainPageDOM();

    const tasks = document.createElement('div');
    tasks.classList.add('tasks-main');

    title.classList.add('main-title');
    title.textContent = projectName;
    tasks.appendChild(title);
    main.appendChild(tasks);
    //Initalizam lista de task-uri actualizata
    for (let i = 0; i < tasksArr.length; i++) {
      createTaskDOM(tasksArr[i]);
    }

    createAddNewTaskDOM();

    //Functionalitatea butonului de adaugare Task
    const addTaskBtn = document.querySelector('.add-task-button');
    addTaskBtn.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      clearForm();
      modal.classList.add('show-modal');
      displayModalDOM(projectName);
    });

    function clearForm() {
      const inputs = document.querySelectorAll(
        'form#add-task input, form#add-task textarea, form#add-task select'
      );
      inputs.forEach((input) => {
        input.value = '';
      });
    }

    const taskBtns = document.querySelectorAll('.task-button');
    taskBtns.forEach((task) => {
      task.addEventListener('click', () => {
        editTask(projectName, task);
      });
    });

    const removeTaskBtns = document.querySelectorAll('.remove-task');
    removeTaskBtns.forEach((remove) => {
      remove.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTask(projectName, remove.parentNode.parentNode);
      });
    });

    function removeTask(projectName, parent) {
      const removedTask = parent.querySelector('p').textContent;
      AppLogic.removeTaskfromProject(projectName, removedTask);
      displayProjectDOM(projectName);
    }
  }

  function createTaskDOM(taskEl) {
    const tasks = document.querySelector('.tasks-main');
    const task = document.createElement('div');
    const img = document.createElement('img');
    const texts = document.createElement('div');
    const text = document.createElement('p');
    const textDate = document.createElement('p');
    const removeBtn = document.createElement('p');
    const right = document.createElement('div');

    text.textContent = `${AppLogic.getTaskName(taskEl)}`;
    textDate.textContent = `${AppLogic.getTaskDate(taskEl)}`;
    removeBtn.textContent = '✖';

    text.classList.add('task-name');
    removeBtn.classList.add('remove-button');
    removeBtn.classList.add('remove-task');

    img.src = 'images/task.png';

    texts.classList.add('task-texts');
    task.classList.add('button');
    task.classList.add('task-button');
    right.classList.add('right');

    task.appendChild(img);
    texts.appendChild(text);
    right.appendChild(textDate);
    right.appendChild(removeBtn);
    texts.appendChild(right);
    task.appendChild(texts);
    tasks.appendChild(task);
  }

  function createAddNewTaskDOM() {
    const tasks = document.querySelector('.tasks-main');
    const task = document.createElement('div');
    const img = document.createElement('img');
    const text = document.createElement('p');

    text.textContent = 'Add new task';
    img.src = 'images/add-task.png';

    task.classList.add('add-task-button');
    task.classList.add('button');

    task.appendChild(img);
    task.appendChild(text);
    tasks.appendChild(task);
  }

  function displayModalDOM(projectName) {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('#add-task');
    const closeBtn = document.querySelector('.close-button');

    form.onsubmit = (e) => {
      e.preventDefault();
      const createdTask = submitForm();
      modal.classList.remove('show-modal');
      addTask(projectName, createdTask);
    };

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show-modal');
      displayProjectDOM(projectName);
    });
  }

  function addTask(projectName, createdTask) {
    AppLogic.addTasktoProject(projectName, createdTask);
    displayProjectDOM(projectName);
  }

  function submitForm() {
    const titleInput = document.querySelector('#form-title');
    const descriptionInput = document.querySelector('#form-description');
    const dateInput = document.querySelector('#form-date');
    const priorityInput = document.querySelector('#form-priority');
    const createdTask = AppLogic.createTask(
      titleInput,
      descriptionInput,
      dateInput,
      priorityInput
    );

    return createdTask;
  }

  function removeProject(parent, selectedProjectName) {
    const removedProject = parent.querySelector('p').textContent;
    AppLogic.removeProject(removedProject);
    loadProjectsDashboardDOM(selectedProjectName);
  }

  function clearMainPageDOM() {
    const main = document.querySelector('.main');
    //Stergem toate elementele
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }
  return {
    loadPageDOM,
  };
})();
