// Obtener caballos guardados en localStorage
const caballos = JSON.parse(localStorage.getItem("caballos")) || [];

// Contenedor donde se mostrarán las tarjetas
const container = document.getElementById("caballos-container");

// Función para mostrar los caballos
function mostrarCaballos() {
    // Verificar que el contenedor exista
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = "";

    // Recorrer cada caballo
    caballos.forEach((caballo, index) => {
        const card = document.createElement("div");
        card.className = "card";

        // Ruta de detalle:
        // 1. Usa la ruta guardada en caballo.detalle
        // 2. Si no existe, usa caballo.link
        // 3. Si tampoco existe, genera automáticamente
        //    caballosventa/caballo1.html, caballo2.html, etc.
        const rutaDetalle =
            caballo.detalle && caballo.detalle.trim() !== ""
                ? caballo.detalle
                : caballo.link && caballo.link.trim() !== ""
                    ? caballo.link
                    : `caballosventa/caballo${index + 1}.html`;

        // Valores por defecto
        const raza = caballo.raza || "Criollo";
        const descripcion =
            caballo.descripcion || "Caballo disponible en nuestro catálogo.";

        card.innerHTML = `
            <img src="${caballo.imagen}" alt="${caballo.nombre}">
            <div class="info">
                <h3>${caballo.nombre}</h3>
                <p><strong>Raza:</strong> ${raza}</p>
                <p><strong>Edad:</strong> ${caballo.edad}</p>
                <p>${descripcion}</p>
                <a href="${rutaDetalle}" class="boton">Ver más</a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Mostrar caballos al cargar la página
mostrarCaballos();