<script setup>
  import BaseButton from "src/components/BaseButton.vue"
  import ListIcon from "src/components/ListIcon.vue"
  import StarIcon from "src/components/StarIcon.vue"

  const props = defineProps({
    modelValue: String, //"all" or "favs"
  })
  defineEmits(["update:modelValue"])
  const width = { width: "285px" }
  const setActiveColor = listType => {
    return listType == props.modelValue ? "accent" : "info"
  }
</script>
<template>
  <div
    class="fixed-bottom bg-white shadow-5 q-pa-xs"
    style="max-height: 60px; height: 100%">
    <q-toolbar class="justify-center q-gutter-x-sm full-height items-center">
      <base-button
        @click="$emit('update:modelValue', 'all')"
        :color="setActiveColor('all')"
        label="All"
        :style="width">
        <list-icon />
      </base-button>
      <base-button
        @click="$emit('update:modelValue', 'favs')"
        :color="setActiveColor('favs')"
        :style="width"
        label="Favorites">
        <star-icon color="white" />
      </base-button>
    </q-toolbar>
  </div>
</template>

<style lang="scss" scoped></style>
