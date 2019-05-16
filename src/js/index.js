import { consultarTarea } from "./modules/consultarTarea"
import { crearTarea } from "./modules/crearTarea"
import { actualizarTarea } from "./modules/actualizarTarea"
import { modal } from "./modules/modal"
import { jSXExpressionContainer } from "babel-types";


const dev = true // Modo dev  

const apiURL = dev ? 'http://localhost/task-proyect/protectedapi' : 'https://drsgps.co/protectedapi'
const apiExtension = '.php'

const apiConsultar = apiURL + '/tareas/consultar' + apiExtension
const apiCrear = apiURL + '/tareas/crear' + apiExtension
const apiActualizar = apiURL + '/tareas/actualizar' + apiExtension
const apiBorrar = apiURL + '/tareas/borrar' + apiExtension

//    // Crear tarea

consultarTarea(apiConsultar)

  ; ((d, w, c, M) => {
    M.AutoInit()
    M.Datepicker.init(d.querySelector('.datepicker'), {
      autoClose: true,
      format: 'yyyy-mm-dd'
    })

    const cudTarea = d.querySelector('#cudTarea');
    const cudTareaTitle = d.querySelector('#cudTareaTitle')
    const cudTareaAccion = d.querySelector('#cudTareaAccion')
    const cudTareaOpciones = d.querySelector('#cudTareaOpciones')
    const cudTareaOpcion = `
    <p>
      <label>
        <input type="radio" name="estado" id="cudTareaFinalizada" value="si">
        <span>Finalizada</span>
      </label>
    </p>
    <p>
      <label>
        <input type="radio" name="estado" id="cudTareaPendiente" value="no">
        <span>Pendiente</span>
      </label>
    </p>
    `
    const cudTareaCancelar = d.querySelector('.cud-tarea__cancelar')



    // Delegaciń de eventos

    d.addEventListener('click', e => {

      const inputId = d.querySelector('#cudTaskId')

      if (e.target.matches('#addTaskbutton')) {
        d.querySelector('#formCud').reset()
        cudTareaOpciones.innerHTML = ''
        cudTareaTitle.textContent = 'Nueva nota'
        cudTareaAccion.innerHTML = ""
        cudTareaAccion.innerHTML = `
        <button type="submit" class="btn cud-tarea__guardar" value="guardar">Guardar</button>
        `
        cudTarea.classList.add('active')
      }

      if (e.target.matches('#cudTaskUpdate')) {
        cudTareaTitle.textContent = 'Actualizar Tarea'
        cudTareaOpciones.innerHTML = cudTareaOpcion
        cudTareaAccion.innerHTML = ""
        cudTareaAccion.innerHTML = `
        <button type="submit" class="btn cud-tarea__actualizar" value="actualizar">Actualizar</button>
        `
        let setTaskId = e.target.parentElement.parentElement.getAttribute('id');
        inputId.value = setTaskId;
        cudTarea.classList.toggle('active')
        const padre = e.target.parentElement.parentElement.children
        const descripcion = d.querySelector('#input-descripcion').value = padre[0].textContent
        const label = d.querySelector('#input-label').classList.add('active')
        const inputRadioPendiente = d.querySelector('#cudTareaPendiente')
        if (padre[2].textContent === 'Finalizada') {
          const inputRadioFinalizado = d.querySelector('#cudTareaFinalizada').checked = true
        } else {
          const inputRadioPendiente = d.querySelector('#cudTareaPendiente').checked = true
        }
      }

      if (e.target.matches('#cudTaskDelete')) {
        let setTaskId = e.target.parentElement.parentElement.getAttribute('id');
        inputId.value = setTaskId;
      }

      if (e.target.matches('.cud-tarea__cancelar')) {
        e.target.parentElement.parentElement.parentElement.classList.remove('active')
      }
    })

    d.addEventListener('submit', e => {

      if (e.target.matches('#formCud')) {
        e.preventDefault()
        const descripcion = d.querySelector('#input-descripcion').value
        const fechaVencimiento = d.querySelector('#input-fechaVencimiento').value
        const inputRadioFinalizado = d.querySelector('#cudTareaFinalizada')
        const inputRadioPendiente = d.querySelector('#cudTareaPendiente')
        const id = d.querySelector('#cudTaskId').value

        let data = {}

        if (d.querySelector('.cud-tarea__guardar')) {
          data = {
            descripcion,
            fechaVencimiento
          }
          crearTarea(apiCrear, data)
          consultarTarea(apiConsultar)
        } else {
          data = {
            id,
            descripcion,
            fechaVencimiento,
            finalizado: (inputRadioFinalizado.checked === true) ? inputRadioFinalizado.value : inputRadioPendiente.value
          }
          actualizarTarea(apiActualizar, data)
          consultarTarea(apiConsultar)
        }
      }
      setTimeout(() => {
        e.target.parentElement.classList.remove('active')
        e.target.reset()

      }, 1000);
    })

    // Search
    d.querySelector('#ordenarTask').addEventListener('keyup', e => {
      let descripcion = d.querySelector('#buscarTarea').value,
        buscarTodas = d.querySelector('#todas').checked,
        buscarFinalizadas = d.querySelector('#finalizadas').checked,
        buscarPendientes = d.querySelector('#pendientes').checked

      let data = {}

      if (buscarTarea != "" && buscarTodas === true) {
        data = {
          descripcion
        }
      } else if (buscarTarea != "" && buscarFinalizadas === true) {
        data = {
          descripcion,
          finalizada: true
        }
      } else if (buscarTarea != "" && buscarPendientes === true) {
        data = {
          descripcion,
          finalizada: false
        }
      } else {
        data = null
      }
      c(data)
      consultarTarea(apiConsultar, data)
      
    })


  })(document, window, console.log, M)