
document.addEventListener('DOMContentLoaded', () => {

    // Definir las secciones con sus respectivos rangos, colores y contadores
    const sections = [
        { id: 'section_1_5', range: [1, 5], color: 'bg-danger', count: 0 },
        { id: 'section_6_11', range: [6, 11], color: 'bg-success', count: 0 },
        { id: 'section_12_17', range: [12, 17], color: 'bg-info', count: 0 }
    ];

    // Agregar eventos de mouseenter a los elementos con id 'starter1', 'starter2' y 'starter3'
    document.getElementById('starter1').addEventListener('mouseenter', () => {
        fetchCharacters(sections[0]);
    });

    document.getElementById('starter2').addEventListener('mouseenter', () => {
        fetchCharacters(sections[1]);
    });

    document.getElementById('starter3').addEventListener('mouseenter', () => {
        fetchCharacters(sections[2]);
    });

    // Función asíncrona para obtener personajes de la API
    async function fetchCharacters(section) {
        if (section.count >= 5) return; // Detener si ya se han generado 5 contenedores
        const container = document.querySelector(`#${section.id} .row`);
        for (let i = section.range[0]; i <= section.range[1] && section.count < 5; i++) {
            const response = await fetch(`https://swapi.dev/api/people/${i}`);
            const character = await response.json();
            if (!container.querySelector(`[data-id='${character.url}']`)) { // Usar URL como identificador único
                const characterElement = createCharacterElement(character, section.color);
                container.appendChild(characterElement);
                section.count++; // Incrementar el contador
                break; // Salir del bucle para generar un personaje por evento
            }
        }
    }

    // Función para crear el elemento de personaje
    function createCharacterElement(character, color) {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-6', 'col-lg-4');
        div.setAttribute('data-id', character.url); // Asignar URL como identificador único
        div.innerHTML = `
            <div class="single-timeline-content d-flex">
                <div class="timeline-icon ${color}"></div>
                <div class="timeline-text">
                    <h6>${character.name}</h6>
                    <p>Altura: ${character.height} cm</p>
                </div>
            </div>
        `;
        return div;
    }
});




