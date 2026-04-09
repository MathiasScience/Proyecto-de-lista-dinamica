const input = document.getElementById('miInput');
const boton = document.getElementById('btnEnviar');
const lista = document.getElementById('miLista');
const listaHecha = document.getElementById('listaHecha');
const btnModo = document.getElementById('btnModo');

boton.addEventListener('click', function() {
    const texto = input.value;

    if (texto.trim() !== "") {
        const li = document.createElement('li');
        li.textContent = texto + " "; // Espacio entre texto y botón

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";

        li.appendChild(btnEliminar);
        lista.appendChild(li);

		btnEliminar.onclick = function() {
            if (li.parentNode === lista) {
                listaHecha.appendChild(li);
                btnEliminar.textContent = "Deshacer";

                const btnFinal = document.createElement('button');
                btnFinal.textContent = "Eliminar Definitivamente 🗑️";
                btnFinal.style.backgroundColor = "#ff4444"; // Un color de advertencia
                
                btnFinal.onclick = function() {
                    li.remove();
                };

                li.appendChild(btnFinal);

                li.dataset.btnFinalId = "true"; 
                
            } else {
                lista.appendChild(li);
                btnEliminar.textContent = "Eliminar";

                const botones = li.querySelectorAll('button');
                botones.forEach(b => {
                    if (b.textContent.includes("Definitivamente")) b.remove();
                });
            }
        };

        input.value = "";
    }
});

btnModo.addEventListener('click', () => {
	document.body.classList.toggle('light-mode');
});