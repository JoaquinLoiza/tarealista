'use strict'

//variables globales
let tareas = [];

//Add Event Listeners
let btnCrear = document.getElementById('btnNewTask');
btnCrear.addEventListener("click", ingresarTarea);

function ingresarTarea() {

    let inputTarea = document.getElementById("newTask");

    //Objeto literal tarea
    let tarea = {
        id: generarUUID(),
        estado: false,
        tarea: inputTarea.value,
    }

    tareas.push(tarea);
    //Vacia el input
    inputTarea.value = "";
    mostrarTareas();
}

function generarUUID() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = Math.floor(Math.random() * 16);
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function mostrarTareas() {

    let contenedorDeTareas = document.getElementById("tasksContainer");
    contenedorDeTareas.innerHTML = "";
    let i = 1;

    for (let tarea of tareas) {

        contenedorDeTareas.innerHTML +=
            `<tr data-id=${tarea.id}>
            <th scope="row">${i++}</th>
            <td>
                <input class="form-check-input" type="checkbox" ${tarea.estado ? "checked" : ""} >
            </td>
            <td>${tarea.tarea}</td>
            <td>
                <button class="btn btn-danger btn-eliminar">
                    <i class="bi bi-trash3"></i>
                </button>
            </td>
        </tr>
        `
    }

    console.clear();
    console.table(tareas);
    eventosTabla();
}

function eventosTabla() {

    //Arreglo de inputs checkbox
    let checkboxes = document.querySelectorAll("#tasksContainer input[type='checkbox']");
    //Arreglo de botones eliminar
    let botonesEliminar = document.querySelectorAll("#tasksContainer button.btn-eliminar");

    for (let checkbox of checkboxes) {
        checkbox.addEventListener("click", () => {
            // Encuentra la fila padre (el <tr>) del checkbox actual
            let fila = checkbox.closest('tr');

            // Funcion manejadora de la fila
            manejadorCheckbox(checkbox, fila);
        });
    }

    for (let boton of botonesEliminar) {
        boton.addEventListener('click', () => {

            let fila = boton.closest('tr');

            manejadorEliminar(fila);
        });
    }
}

function manejadorCheckbox(checkbox, fila) {

    let tarea = obtenerTarea(fila);

    if (checkbox.checked) {
        tarea.estado = true;
    } else {
        tarea.estado = false;
    }
}

function manejadorEliminar(fila) {

    // Obtengo la tarea a partir de la fila.
    let tarea = obtenerTarea(fila);

    // metodo indexOf me da la posicion de la tarea.
    let posicion = tareas.indexOf(tarea);

    // Elimina el objeto en la posicion indicada.
    // '1' significa que eliminara un solo 
    // elemento a partir de dicha posicion.
    tareas.splice(posicion, 1);
    mostrarTareas();
}


function obtenerTarea(fila) {

    let idFila = fila.getAttribute("data-id");

    let tarea = tareas.find(t => t.id == idFila);

    return tarea;
}