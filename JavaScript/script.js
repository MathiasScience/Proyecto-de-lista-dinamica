const input = document.getElementById('miInput');
const boton = document.getElementById('btnEnviar');
const lista = document.getElementById('miLista');
const listaHecha = document.getElementById('listaHecha');
const btnModo = document.getElementById('btnModo');

boton.addEventListener('click', function() {
    const texto = input.value;

    if (texto.trim() !== "") {
        // 1. Crear el contenedor de la lista (li)
        const li = document.createElement('li');
        li.textContent = texto + " "; // Espacio entre texto y botón

        // 2. Crear el botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";

        // 3. Meter el botón dentro del li, y el li dentro de la lista
        li.appendChild(btnEliminar);
        lista.appendChild(li);

		// 4. Programar qué pasa al hacer clic en "Eliminar"
		btnEliminar.onclick = function() {
            if (li.parentNode === lista) {
                // PASO 1: Mover de Pendientes a Hechas
                listaHecha.appendChild(li);
                btnEliminar.textContent = "Deshacer";

                // PASO 2: Crear el botón de "Eliminar Definitivamente"
                const btnFinal = document.createElement('button');
                btnFinal.textContent = "Eliminar Definitivamente 🗑️";
                btnFinal.style.backgroundColor = "#ff4444"; // Un color de advertencia
                
                btnFinal.onclick = function() {
                    li.remove(); // Aquí sí desaparece para siempre
                };

                li.appendChild(btnFinal);

                // Guardamos una referencia para poder quitarlo si el usuario pulsa "Deshacer"
                li.dataset.btnFinalId = "true"; 
                
            } else {
                // PASO 3: Regresar de Hechas a Pendientes (Deshacer)
                lista.appendChild(li);
                btnEliminar.textContent = "Eliminar";

                // Quitamos el botón de eliminar definitivamente si el usuario se arrepintió
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