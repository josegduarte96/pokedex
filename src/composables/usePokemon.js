import { useQuery } from "@tanstack/vue-query"
import { api } from "src/api"
import { usePokemonsStore } from "src/stores/pokemons"
import { computed, watchEffect } from "vue"

const getPokemon = async (name) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
  const { data } = await api.get(`pokemon/${name}`)
  return data
}

const usePokemon = (pokemonName) => {
  const store = usePokemonsStore()
  const { data: pokemonInfo, isLoading } = useQuery(["pokemon", pokemonName], () => getPokemon(pokemonName))
  const pokeInfo = computed(() => store.pokemon)

  watchEffect(() => {
    if (pokemonInfo.value) {
      const { sprites, weight, height, name, types } = pokemonInfo.value
      const tipos = types.map(({ type }) => type.name)
      store.pokemon = {
        image: sprites.other.dream_world.front_default,
        pokemonName: name,
        weight,
        height,
        types: tipos.join(", "),
      }
    }
  })

  return {
    pokeInfo,
    isLoading: computed(() => isLoading.value),
    setFavorite: store.setFavorite,
  }
}

export default usePokemon
