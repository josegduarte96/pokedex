<script setup>
import BaseButton from "./BaseButton.vue"
import StarIcon from "./StarIcon.vue"
defineProps({
  pokemon: Object,
})
defineEmits(["asFavorite", "pokemonDetail"])
</script>
<template>
  <q-card flat class="q-pa-sm q-my-xs">
    <q-card-section horizontal class="items-center q-pa-xs">
      <span @click="$emit('pokemonDetail')" class="text-dark text-bold text-body1 text-capitalize full-width">{{
        pokemon.name
      }}</span>
      <div>
        <base-button @click="$emit('asFavorite')" size="sm" round color="primary">
          <star-icon v-if="pokemon.isFavorite" class="full-width" color="goldenrod" />
          <star-icon v-else class="full-width" />
        </base-button>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped></style>
