<script setup>
  import { ref } from "vue"

  defineEmits(["filter"])
  const model = ref("")
</script>
<template>
  <q-input
    v-model="model"
    debounce="500"
    @update:model-value="$emit('filter', $event)"
    class="q-mb-xl"
    placeholder="Search"
    bg-color="white"
    standout="bg-white"
    input-style="color: black">
    <template #prepend>
      <q-icon
        color="dark"
        name="search" />
    </template>
  </q-input>
</template>

<style lang="scss" scoped></style>
