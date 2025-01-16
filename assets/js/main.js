const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 151
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {              
        const newHtml = pokemons.map((pokemon) => `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                            <button class="botaopokemons" data-number="${pokemon.number}">Mais info</button>
                     </div>
                </li>
            `).join('')

        pokemonList.innerHTML += newHtml

        const botoes = document.querySelectorAll('.botaopokemons');
        botoes.forEach((botao) => {
            botao.addEventListener('click', (event) => {
                const pokemonNumber = event.target.getAttribute('data-number');
                const pokemonInfo = pokemons.find(p => p.number == pokemonNumber);
                mostrarPopupPokemon(pokemonInfo);
            });
        });

    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => { 
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})


function mostrarPopupPokemon(pokemon) {
    
    const popupHtml = `
        <div class="popup " >
            <div class="popup-content ${pokemon.type}">
                <span class="popup-close">&times;</span>
                <h2 class="name">${capitalizeFirstLetter(pokemon.name)}</h2
                <p><strong>Tipo:</strong> ${pokemon.types.join(', ')}</p>
                <p><strong>Número:</strong> #${pokemon.number}</p>
                <p><strong>Altura:</strong> ${pokemon.height} Decímetros</p>
                <p><strong>Peso:</strong> ${pokemon.weight} Hectogramas</p>
                <p><strong>Vida Base:</strong> ${pokemon.health} pontos de vida</p>
                <p><strong>Ataque Base:</strong> ${pokemon.attack} pontos de ataque</p>
                <p><strong>Defesa Base:</strong> ${pokemon.defense} pontos de defesa</p>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    `;


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const popupContainer = document.createElement('div');
    popupContainer.innerHTML = popupHtml;
    document.body.appendChild(popupContainer);

    
    const closeBtn = popupContainer.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        popupContainer.remove();
    });
}

