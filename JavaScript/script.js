const input = document.getElementById('miInput');
const boton = document.getElementById('btnEnviar');
const lista = document.getElementById('miLista');
const listaHecha = document.getElementById('listaHecha');
const btnModo = document.getElementById('btnModo');

// Función para guardar en la DB
async function guardarTareaDB(contenido) {
    await fetch('/api/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ content: contenido })
    });
}

boton.addEventListener('click', async function() {
    const texto = input.value;

    if (texto.trim() !== "") {
        await guardarTareaDB(texto); // Guardar en Python
        crearElementoTarea(texto, lista);
        input.value = "";
    }
});

function crearElementoTarea(texto, contenedor) {
    const li = document.createElement('li');
    li.className = "tarea-item";
    li.textContent = texto + " ";

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Completar";
    btnEliminar.className = "btn-status";

    li.appendChild(btnEliminar);
    contenedor.appendChild(li);

    btnEliminar.onclick = function() {
        if (li.parentNode === lista) {
            listaHecha.appendChild(li);
            btnEliminar.textContent = "Deshacer";

            const btnFinal = document.createElement('button');
            btnFinal.textContent = "Eliminar";
            btnFinal.className = "btn-danger";
            
            btnFinal.onclick = () => li.remove();
            li.appendChild(btnFinal);
        } else {
            lista.appendChild(li);
            btnEliminar.textContent = "Completar";
            const dangerBtn = li.querySelector('.btn-danger');
            if (dangerBtn) dangerBtn.remove();
        }
    };
}

btnModo.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
///32-bits-or-64||MathiasScience\\\
