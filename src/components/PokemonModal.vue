<script setup>
import { useDialogPluginComponent } from "quasar"
import BaseLoading from "src/components/BaseLoading.vue"
import usePokemon from "src/composables/usePokemon"
import BaseButton from "./BaseButton.vue"
import CloseIcon from "./CloseIcon.vue"
import StarIcon from "./StarIcon.vue"

defineEmits([...useDialogPluginComponent.emits])
const props = defineProps({
  pokemon: Object,
})

const { isLoading, pokeInfo, setFavorite } = usePokemon(props.pokemon.name)
const { dialogRef, onDialogHide } = useDialogPluginComponent()
const toClipboard = () => {
  const { pokemonName, weight, height, types } = pokeInfo.value
  navigator.clipboard.writeText(`${pokemonName}, ${weight}, ${height}, ${types}`)
}
</script>
<template>
  <q-dialog persistent ref="dialogRef">
    <q-card style="max-width: 570px; width: 100%" class="full-width" v-if="!isLoading" flat bordered>
      <q-img height="260px" fit="cover" src="~assets/modal-banner.svg">
        <q-img height="180px" class="transparent absolute" fit="scale-down" :src="pokeInfo.image" style="top: 25%" />
      </q-img>
      <close-icon @click="onDialogHide" class="absolute cursor-pointer" style="top: 8px; right: 12px" />
      <div class="q-pa-md">
        <q-card-section class="text-capitalize text-body1">
          <span>Name: {{ pokeInfo.pokemonName }}</span>
          <q-separator spaced />
          <span>Weight: {{ pokeInfo.weight }}</span>
          <q-separator spaced />
          <span>Height: {{ pokeInfo.height }}</span>
          <q-separator spaced />
          <span>Types: {{ pokeInfo.types }}</span>
          <q-separator spaced />
        </q-card-section>
        <q-card-actions align="between" class="q-px-md">
          <base-button class="col-9 col-sm-5" @click="toClipboard" label="Share to my friends" />
          <base-button @click="setFavorite(pokeInfo.pokemonName)" size="md" round color="primary">
            <star-icon size="sm" v-if="pokemon.isFavorite" class="full-width" color="goldenrod" />
            <star-icon size="sm" v-else class="full-width" />
          </base-button>
        </q-card-actions>
      </div>
    </q-card>
    <base-loading v-else />
  </q-dialog>
</template>

<style lang="scss" scoped></style>
