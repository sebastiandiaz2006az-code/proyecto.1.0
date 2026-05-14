// Clave donde se guardan los datos
const STORAGE_KEY = "caballos";
// Referencias al formulario y contenedor
const formulario = document.getElementById("form-caballo");
const lista = document.getElementById("lista-caballos");
// Índice del caballo que se está editando
let indiceEditar = null;
// DATOS INICIALES
function obtenerCaballos() {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (datos) {
        return JSON.parse(datos);
    }

    // Caballos por defecto
    const caballosIniciales = [
        {
            nombre: "Caballo de capa negra",
            edad: "5 años",
            imagen: "imagenes/caballo.negro.jpg",
            enlace: "caballosventa/caballo1.html"
        },
        {
            nombre: "Caballo alazán",
            edad: "3 años",
            imagen: "imagenes/caballo.cafe.claro.jpg",
            enlace: "caballosventa/caballo2.html"
        },
        {
            nombre: "Caballo bayo",
            edad: "4 años",
            imagen: "imagenes/caballo.cafe,brillante.oscuro.jpg",
            enlace: "caballosventa/caballo3.html"
        },
        {
            nombre: "Caballo Pinto",
            edad: "2 años",
            imagen: "imagenes/caballo.manchas. blancas.jpg",
            enlace: "caballosventa/caballo4.html"
        },
        {
            nombre: "Espíritu",
            edad: "1 año",
            imagen: "imagenes/caballo.bebe.jpg",
            enlace: "caballosventa/caballo5.html"
        }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(caballosIniciales));
    return caballosIniciales;
}
// GUARDAR DATOS
function guardarCaballos(caballos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caballos));
}
// MOSTRAR LISTA EN EL PANEL ADMIN
function mostrarCaballos() {
    if (!lista) return;

    const caballos = obtenerCaballos();
    lista.innerHTML = "";

    caballos.forEach((caballo, index) => {
        const item = document.createElement("div");
        item.className = "item-caballo";

        item.innerHTML = `
            <strong>${caballo.nombre}</strong> - ${caballo.edad}
            <br>
            <button onclick="editarCaballo(${index})">✏️ Editar</button>
            <button onclick="eliminarCaballo(${index})">🗑 Eliminar</button>
            <hr>
        `;

        lista.appendChild(item);
    });
}
// AGREGAR O EDITAR
if (formulario) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const imagen = document.getElementById("imagen").value;
        const enlace = document.getElementById("enlace").value;
        const nuevoCaballo = {
            nombre,
            edad,
            imagen,
            enlace
        };
        const caballos = obtenerCaballos();
        if (indiceEditar === null) {
            // Crear
            caballos.push(nuevoCaballo);
        } else {
            // Editar
            caballos[indiceEditar] = nuevoCaballo;
            indiceEditar = null;
        }
        guardarCaballos(caballos);
        formulario.reset();
        mostrarCaballos();
    });
}
// EDITAR
function editarCaballo(index) {
    const caballos = obtenerCaballos();
    const caballo = caballos[index];
    document.getElementById("nombre").value = caballo.nombre;
    document.getElementById("edad").value = caballo.edad;
    document.getElementById("imagen").value = caballo.imagen;
    document.getElementById("enlace").value = caballo.enlace;
    indiceEditar = index;
}
// ELIMINAR
function eliminarCaballo(index) {
    const confirmar = confirm("¿Deseas eliminar este caballo?");

    if (!confirmar) return;

    const caballos = obtenerCaballos();
    caballos.splice(index, 1);

    guardarCaballos(caballos);
    mostrarCaballos();
}
// INICIALIZAR
obtenerCaballos();
mostrarCaballos();