'use strict'

const btnAddProject = document.getElementById("btnNewProject");
btnAddProject.addEventListener("click", addProject);

window.addEventListener("DOMContentLoaded", async () => {
    showProjects(await getProjects());
});

const btnCloseModal = document.getElementById("closeModalIcon");
btnCloseModal.addEventListener('click', showHidden);

const url = "https://6542deec01b5e279de1faa70.mockapi.io/api";


//--------------- FUNCIONES -------------------

function getProjects() {

    const endpoint = "/projects";

    return fetch(url + endpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error ${response.status} en el servidor`);
            }
            return response.json();
        }).then((projects) => {

            //retorno de la funcion
            return projects;
        }).catch((error) => {
            console.error(error);
            return error;
        });
}

function getProject(idProject) {

    const endpoint = "/projects/" + idProject;

    return fetch(url + endpoint)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status} en el servidor`);
        } return response.json();
    }).then( obj => {
        return obj;
    }).catch(error => {
        console.log(error);
        return error;
    });
}

function showProjects(projects) {

    let container = document.getElementById("projectContainer");
    let i = 1;

    if (Array.isArray(projects)) {

        container.innerHTML = "";

        for (let project of projects) {

            container.innerHTML +=
                `<tr data-id=${project.id}>
                <th scope="row">${i++}</th>
                <td>
                    <a href="./tasks.html?idProject=${project.id}">${project.title}</a>
                </td>
                <td>${project.creator}</td>
                <td>
                    <button class="btn btn-danger btnDelete">
                        <i class="bi bi-trash3"></i>
                    </button>
                    <button class="btn btn-warning btnEdit">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
            </tr>
            `
        }

        tableEvents();
    } else {
        alert("Error al cargar los proyectos: " + projects);
    }

}

function addProject() {

    let inputNameProject = document.getElementById("inputNameProject");
    let inputCreatorProject = document.getElementById("inputCreatorProject");
    const endpoint = "/projects";

    let project = {
        title: inputNameProject.value,
        creator: inputCreatorProject.value,
        finished: false
    }

    fetch(url + endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status} en el servidor`);
        }
        return response.json();
    }).then(async () => {
        showProjects(await getProjects());
        inputNameProject.value = "";
        inputCreatorProject.value = "";
    }).catch(error => {
        console.log(error);
    });
}

function deleteProject(idProject) {

    console.log("Eliminando id: "+idProject);

    const endpoint = "/projects/" + idProject;

    fetch(url + endpoint, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
    }).then(async () => {
        alert('Elemento eliminado con éxito');
        showProjects(await getProjects());
    }).catch(error => {
        console.error('Error:', error);
    });
}

function tableEvents() {

    //Arreglo de botones eliminar
    let btnsDelete = document.querySelectorAll("#projectContainer button.btnDelete");

    for (let button of btnsDelete) {

        button.addEventListener('click', () => {
            let row = button.closest('tr');
            let idProject = row.getAttribute("data-id");
            deleteProject(idProject);
        });
    }

    //Arreglo de botones update
    let btnsEdit = document.querySelectorAll("#projectContainer button.btnEdit");

    for (let button of btnsEdit) {

        button.addEventListener('click', () => {
            let row = button.closest('tr');
            let idProject = row.getAttribute("data-id");
            modalEditProject(idProject);
        });
    }
}

function modalEditProject(idProject) {
    
    let btnConfirmEdition = document.getElementById("btnEditProject");
    let inputTitle = document.getElementById("editNameProject");
    let inputAuthor = document.getElementById("editAuthorProject");
    let project;
    
    (async () => {
        project = await getProject(idProject);
        inputTitle.value = project.title;
        inputAuthor.value = project.creator;
        showHidden();
        btnConfirmEdition.addEventListener("click", handlerEdit);
    })();
    
    function handlerEdit() {
        editProject(idProject);
        btnConfirmEdition.removeEventListener("click", handlerEdit)
    }
}

function editProject(idProject) {

    let inputTitle = document.getElementById("editNameProject");
    let inputAuthor = document.getElementById("editAuthorProject");
    const endpoint = "/projects/" + idProject;

    let project = {
        title: inputTitle.value,
        creator: inputAuthor.value,
        finished: false
    }

    fetch(url + endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    }).then( response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status} en el servidor`);
        }
    }).then(async () => {
        showProjects(await getProjects());
        showHidden();
        inputTitle.value = "";
        inputAuthor.value = "";
    }).catch((error) => {
        console.log(error);
    });
}

function showHidden() {
    let modal = document.getElementById("backgroundBlur");
    modal.classList.toggle('hidden');
}