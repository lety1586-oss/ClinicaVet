// --- CONFIGURACIÓN DE ALMACENAMIENTO DE DATOS (LocalStorage) ---
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
let citas = JSON.parse(localStorage.getItem('citas')) || [];
let historiales = JSON.parse(localStorage.getItem('historiales')) || [];

// --- ELEMENTOS DEL DOM ---
const formMascota = document.getElementById('form-mascota');
const formCitas = document.getElementById('form-citas');
const formHistorial = document.getElementById('form-historial');

const listaMascotas = document.getElementById('lista-mascotas');
const listaCitas = document.getElementById('lista-citas');
const cronologiaHistorial = document.getElementById('cronologia-historial');

const selectMascotaCita = document.getElementById('seleccionar-mascota-cita');
const selectMascotaHistorial = document.getElementById('seleccionar-mascota-historial');

// --- FUNCIONES DE RENDERIZADO Y LOGICA ---

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarMascotas();
    actualizarCitas();
    actualizarHistoriales();
});

// Guardar y renderizar Mascotas
formMascota.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevaMascota = {
        id: Date.now().toString(),
        nombre: document.getElementById('nombre-mascota').value,
        especie: document.getElementById('especie').value,
        edad: document.getElementById('edad').value
    };

    mascotas.push(nuevaMascota);
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
    
    formMascota.reset();
    actualizarMascotas();
});

function actualizarMascotas() {
    listaMascotas.innerHTML = '';
    selectMascotaCita.innerHTML = '<option value="">-- Selecciona una mascota --</option>';
    selectMascotaHistorial.innerHTML = '<option value="">-- Selecciona una mascota --</option>';

    mascotas.forEach(mascota => {
        // Añadir a la lista visual de mascotas
        const li = document.createElement('li');
        li.textContent = `🐾 ${mascota.nombre} (${mascota.especie}) - ${mascota.edad}`;
        listaMascotas.appendChild(li);

        // Añadir a los selectores (dropdowns) de citas e historial
        const option1 = document.createElement('option');
        option1.value = mascota.nombre;
        option1.textContent = mascota.nombre;
        selectMascotaCita.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = mascota.nombre;
        option2.textContent = mascota.nombre;
        selectMascotaHistorial.appendChild(option2);
    });
}

// Guardar y renderizar Citas (Botón "Guardar Cita")
formCitas.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaCita = {
        mascota: selectMascotaCita.value,
        fecha: document.getElementById('fecha-cita').value,
        hora: document.getElementById('hora-cita').value
    };

    citas.push(nuevaCita);
    localStorage.setItem('citas', JSON.stringify(citas));

    formCitas.reset();
    actualizarCitas();
});

function actualizarCitas() {
    listaCitas.innerHTML = '';
    
    // Ordenar citas por fecha de la más cercana a la más lejana
    citas.sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));

    citas.forEach(cita => {
        const li = document.createElement('li');
        li.innerHTML = `🗓️ <strong>${cita.mascota}</strong> - ${cita.fecha} a las ${cita.hora}hs`;
        listaCitas.appendChild(li);
    });
}

// Guardar y renderizar Historial Médico (Botón "Registrar Historial")
formHistorial.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoHistorial = {
        mascota: selectMascotaHistorial.value,
        fechaRegistro: new Date().toLocaleDateString(),
        diagnostico: document.getElementById('diagnostico').value
    };

    historiales.push(nuevoHistorial);
    localStorage.setItem('historiales', JSON.stringify(historiales));

    formHistorial.reset();
    actualizarHistoriales();
});

function actualizarHistoriales() {
    cronologiaHistorial.innerHTML = '';

    // Mostrar los historiales invertidos (el más reciente primero)
    historiales.slice().reverse().forEach(historial => {
        const div = document.createElement('div');
        div.className = 'historial-item';
        div.innerHTML = `
            <small>📅 Registrado el: ${historial.fechaRegistro}</small>
            <strong>Paciente: ${historial.mascota}</strong>
            <p>${historial.diagnostico}</p>
        `;
        cronologiaHistorial.appendChild(div);
    });
}