import { useQuery } from "@tanstack/vue-query"
import { api } from "src/api"
import { usePokemonsStore } from "src/stores/pokemons"
import { computed, ref, watch } from "vue"

const getPokemons = async () => {
  await new Promise(resolve => {
    setTimeout(resolve, 2000)
  })
  const { data } = await api.get("pokemon")
  return data
}

const usePokemons = () => {
  const store = usePokemonsStore()
  const { data: pokemons, isLoading } = useQuery(["pokemons"], getPokemons)
  const filteredPokemons = ref()
  const pokemonsAll = computed(() => filteredPokemons.value ?? store.pokemons)
  const pokemonsFavs = computed(() =>
    pokemonsAll.value.filter(poke => poke.isFavorite)
  )

  watch(
    () => pokemons.value,
    pokemons => {
      if (pokemons?.results.length > 0) {
        store.pokemons = pokemons.results.map(poke => ({
          ...poke,
          isFavorite: false,
        }))
      }
    }
  )

  const filterPokemons = filter => {
    if (filter != "")
      filteredPokemons.value = store.pokemons.filter(({ name }) =>
        name.includes(filter.toLowerCase())
      )
    else filteredPokemons.value = undefined
  }

  return {
    pokemonsAll,
    pokemonsFavs,
    isLoading: computed(() => isLoading.value),
    filterPokemons,
    setFavorite: store.setFavorite,
  }
}

export default usePokemons
