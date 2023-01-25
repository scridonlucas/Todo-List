import Project from './Project';
import Task from './Task';

function saveData(project) {
  // salvam proiectul in localStorage in functie de nume
  let name = project.getName();
  let project_serialized = JSON.stringify(project);
  localStorage.setItem(`${name}`, project_serialized);
}

function retrieveData(projectName) {
  if (!localStorage.getItem(`${projectName}`)) {
    return new Project('');
  }
  // recuperam obiectul din localStorage
  let project_deserialized = JSON.parse(localStorage.getItem(`${projectName}`));
  retrieveMethods(project_deserialized); // prin aceasta metoda atasam iar obiectului metodele pierdute cand s-a stocat in localStorage
  return project_deserialized; // returnam obiectul final
}

//am folosit doua abordari diferite pentru a recupera metodele obiectelor
function retrieveMethods(recievedProject) {
  Object.setPrototypeOf(recievedProject, Project.prototype); // setam prototipul obiectului inapoi la project.prototype pentru a obtine iar metodele
  recievedProject.setTasks(
    recievedProject.getTasks().map((task) => Object.assign(new Task(), task))
  ); /* parcurgem sirul, si inlocuim fiecare obiect din sir cu un obiect nou ce va contine toate metodele (new Task) 
  cat si datele despre fiecare task. Am folosit o abordare diferita fata de prima pentru a le experimenta pe ambele */
}

function removeData(recievedProject) {
  localStorage.removeItem(`${recievedProject}`);
}
export { saveData, retrieveData, removeData };

/*
O alta abordare ar fi crearea unui sir projects pe care sa-l stocam in localStorage si in care sa adaugam proiectele.
Ca sa recuperam metodele, parcurgem sirul si cu metoda .map modificam obiectele cu noi obiecte ce contin atat metodele
clasei cat si proprietatile obiectelor initiale (Object.assign(new Project(), project)). Astfel creeam noi obiecte in 
care copiem datele din project dar contin si metodele pierdute
*/
