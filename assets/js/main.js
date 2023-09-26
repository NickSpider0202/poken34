const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0;


function loadPokemonItems(offset, limit) {
     function convertPokemonToLi(pokemon){              
            return `
                <li class="pokemon ${pokemon.type}">u9p-
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
            
                        <img src="${pokemon.photo}" 
                            alt="${pokemon.name}">
                     </div>
                </li>
            `     
    }


    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(limit, offset)

loadMoreButton.addEventListener('click', () => { 
    loadPokemonItems()
})