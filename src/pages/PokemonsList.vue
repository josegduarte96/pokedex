<script setup>
  import { useQuasar } from "quasar"
  import BaseContainer from "src/components/BaseContainer.vue"
  import BaseLoading from "src/components/BaseLoading.vue"
  import FooterButtons from "src/components/FooterButtons.vue"
  import NotFound from "src/components/NotFound.vue"
  import PokemonCard from "src/components/PokemonCard.vue"
  import PokemonModal from "src/components/PokemonModal.vue"
  import SearchPokemon from "src/components/SearchPokemon.vue"
  import usePokemons from "src/composables/usePokemons"
  import { computed, ref } from "vue"

  const { pokemonsAll, pokemonsFavs, filterPokemons, isLoading, setFavorite } =
    usePokemons()

  const filterKey = ref("all")
  const q = useQuasar()

  const listView = computed(() => {
    return filterKey.value == "all" ? pokemonsAll.value : pokemonsFavs.value
  })

  const pokemonDetails = pokemon => {
    q.dialog({
      component: PokemonModal,
      componentProps: {
        pokemon,
      },
    })
  }
</script>
<template>
  <base-container v-if="!isLoading">
    <!-- Form -->
    <search-pokemon @filter="filterPokemons" />
    <!-- Pokemons -->
    <div
      v-if="listView.length > 0"
      class="row q-mb-xl">
      <pokemon-card
        v-for="poke in listView"
        :key="poke.name"
        :pokemon="poke"
        @pokemon-detail="pokemonDetails(poke)"
        @as-favorite="setFavorite(poke.name)"
        class="col-12" />
      <footer-buttons v-model="filterKey" />
    </div>
    <!-- Not Found Message -->
    <not-found v-else />
  </base-container>
  <base-loading v-else />
</template>

<style lang="scss" scoped></style>
