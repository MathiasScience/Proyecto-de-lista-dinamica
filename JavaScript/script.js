document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('miInput');
    const btnEnviar = document.getElementById('btnEnviar');
    const listaPendientes = document.getElementById('miLista');
    const listaHecha = document.getElementById('listaHecha');

    // --- LÓGICA DE LA "DB" EN EL NAVEGADOR ---

    // Función para guardar todo el estado actual en LocalStorage
    function guardarEnDB() {
        const tareasPendientes = [];
        listaPendientes.querySelectorAll('span').forEach(span => tareasPendientes.push(span.innerText));

        const tareasHechas = [];
        listaHecha.querySelectorAll('span').forEach(span => tareasHechas.push(span.innerText));

        const datos = {
            pendientes: tareasPendientes,
            hechas: tareasHechas
        };

        // Guardamos como una cadena de texto (JSON)
        localStorage.setItem('miDB_Tareas', JSON.stringify(datos));
    }

    // Función para cargar los datos al iniciar
    function cargarDeDB() {
        const datosGuardados = localStorage.getItem('miDB_Tareas');
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            datos.pendientes.forEach(t => crearTarea(t, false));
            datos.hechas.forEach(t => crearTarea(t, true));
        }
    }

    // --- LÓGICA DE LA INTERFAZ ---

    function crearTarea(texto, esHecha = false) {
        const li = document.createElement('li');
        li.className = "tarea-item";
        li.innerHTML = `<span>${texto}</span>`;

        const divBtns = document.createElement('div');
        const btnCheck = document.createElement('button');
        btnCheck.textContent = esHecha ? "↺" : "✓";
        btnCheck.className = "btn-status";

        const btnDelete = document.createElement('button');
        btnDelete.textContent = "🗑️";
        btnDelete.className = "btn-delete";

        divBtns.append(btnCheck, btnDelete);
        li.appendChild(divBtns);

        if (esHecha) listaHecha.appendChild(li);
        else listaPendientes.appendChild(li);

        btnCheck.onclick = () => {
            if (li.parentNode === listaPendientes) {
                listaHecha.appendChild(li);
                btnCheck.textContent = "↺";
            } else {
                listaPendientes.appendChild(li);
                btnCheck.textContent = "✓";
            }
            guardarEnDB(); // Guardar cambio de estado
        };

        btnDelete.onclick = () => {
            li.remove();
            guardarEnDB(); // Guardar eliminación
        };
    }

    btnEnviar.onclick = () => {
        const valor = input.value.trim();
        if (valor) {
            crearTarea(valor);
            input.value = "";
            guardarEnDB(); // Guardar nueva tarea
        }
    };

    // Cargar los datos nada más abrir la página
    cargarDeDB();
});
