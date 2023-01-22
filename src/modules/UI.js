import Project from './Project';
import Task from './Task';
import { saveData, retrieveData } from './Storage';

function loadProjectsDOM() {
  //Afisam in dashboard proiectele
  let dashboard = document.querySelector('.second-buttons');
  let projects = dashboard.querySelectorAll('div');

  projects.forEach((project) => project.remove()); // Stergem fiecare div din dashboard

  for (let i = 0; i < localStorage.length; i++) {
    // Parcurgem localStorage-ul si creeam in DOM proiectele
    createProjectDOM(localStorage.key(i));
  }

  createAddNewProjectDOM(); // Dupa ce se afiseaza proiectele se afiseaza butonul de adaugare a unui proiect nou

  const addProjectBtn = document.querySelector('.add-project');
  addProjectBtn.addEventListener('click', addInputProjectDOM); // Adaugam functionalitate butonului de adaugare proiect
}

function createProjectDOM(projectName) {
  //Cream un nou proiect in DOM
  let dashboard = document.querySelector('.second-buttons');
  let project = document.createElement('div');
  let img = document.createElement('img');
  let text = document.createElement('p');

  text.textContent = `${projectName}`;
  img.src = 'images/project.png';

  project.classList.add('button');

  project.appendChild(img);
  project.appendChild(text);
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

function addInputProjectDOM() {
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
    createProject(input.value);
    loadProjectsDOM();
  });

  cancelBtn.addEventListener('click', () => {
    //Reafisam DOM-ul
    loadProjectsDOM();
  });
}

function createProject(projectName) {
  //Cream un proiect nou si il introducem in localStorage
  saveData(new Project(`${projectName}`));
}

export { loadProjectsDOM };
