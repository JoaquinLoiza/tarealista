'use strict'

// Función para obtener los parámetros de consulta de la URL
function getQueryParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

// Obtener los parámetros de consulta
const queryParams = getQueryParameters();
const id = queryParams.get('idProject');

// Mostrar los parámetros en la página
const parametrosDiv = document.getElementById('parametros');
parametrosDiv.innerHTML = `<h2>Valor del parámetro 'idProject': ${id}</h2>`;