import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"

export const usePokemonsStore = defineStore("pokemons", () => {
  //State
  const pokemons = ref([])
  const pokemon = ref()

  //Getters

  //Actions
  const setFavorite = pokemonName => {
    pokemons.value.map(poke => {
      if (poke.name === pokemonName) {
        poke.isFavorite = !poke.isFavorite
      }
    })
  }

  return {
    pokemons,
    pokemon,
    setFavorite,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonsStore, import.meta.hot))
}
