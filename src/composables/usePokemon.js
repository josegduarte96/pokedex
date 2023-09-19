import { useQuery } from "@tanstack/vue-query"
import { api } from "src/api"
import { usePokemonsStore } from "src/stores/pokemons"
import { computed, watch } from "vue"

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

  watch(
    () => pokemonInfo.value,
    (info) => {
      if (info) {
        const types = info.types.map(({ type }) => type.name)
        store.pokemon = {
          image: info.sprites.other.dream_world.front_default,
          pokemonName,
          weight: info.weight,
          height: info.height,
          types: types.join(", "),
        }
      }
    },
  )

  return {
    pokeInfo,
    isLoading: computed(() => isLoading.value),
    setFavorite: store.setFavorite,
  }
}

export default usePokemon
