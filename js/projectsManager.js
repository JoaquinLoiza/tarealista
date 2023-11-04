'use strict'

window.addEventListener("DOMContentLoaded", async () => {
    showProjects( await getProjects() );
});

const url = "https://6542deec01b5e279de1faa70.mockapi.io/api";


// hacer fetch
function getProjects() {

    const endpoint = "/projects";

    return fetch(url + endpoint)
    .then( (response) => {
        if(!response.ok) {
            throw new Error(`Error ${response.status} en el servidor`);
        } 
        return response.json();
    }).then( (projects) => {

        //retorno de la funcion
        return projects;
    }).catch( (error) => {
        console.log(error);
        return null;
    });
}

function showProjects( projects ) {
    
    let container = document.getElementById("projectContainer");
    let i = 1; 

    if(projects != null) {

        container.innerHTML = "";
    
        for( let project of projects) {
    
            container.innerHTML += 
            `<tr data-id=${project.id}>
                <th scope="row">${i++}</th>
                <td>${project.title}</td>
                <td>${project.creator}</td>
                <td>
                    <button class="btn btn-danger btn-eliminar">
                        <i class="bi bi-trash3"></i>
                    </button>
                </td>
            </tr>
            `
        }
    } else {
        alert('Ocurrio un error inesperado');
    }

}