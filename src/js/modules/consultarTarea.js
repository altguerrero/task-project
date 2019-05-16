import {ajax} from "./ajax"

export const consultarTarea = (uri, data) => {
  const request = {
    method: 'GET',
    url: uri,
    data: JSON.stringify(data)
  }
  ajax(request)
  .then(res => {
    draw(JSON.parse(res.responseText))
  })
}


const draw = data => {
  const fragment = document.createDocumentFragment();

  data.forEach(task => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task__item");
    taskContainer.setAttribute("id", `${task.id}`);
    taskContainer.innerHTML = `
    <p class="task__description">${task.descripcion}</p>
    <p class="task__date">Fecha de Vencimiento: <b>${(task.fechaVencimiento).slice(0, 10).replace('-', ' / ').replace('-', ' / ')}</b></p>
    <p class="task__state">${task.finalizada ? "Finalizada" : "Pendiente"}</p>
    <div class="task__edit">
      <svg class="svg-icon before" id="cudTaskUpdate">
        <use href="assets/img/icons.svg#edit"></use>
      </svg>
    </div>
    <div class="task__delete">
      <svg class="svg-icon before" id="cudTaskDelete">
        <use href="assets/img/icons.svg#delete-stroke"></use>
      </svg>
    </div>
           `
    fragment.appendChild(taskContainer);
  });
  document.getElementById("task-container").appendChild(fragment);
};
