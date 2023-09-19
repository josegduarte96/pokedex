<script setup>
import BaseButton from "src/components/BaseButton.vue"
</script>
<template>
  <div class="column items-center q-mt-lg">
    <h4 class="text-bold q-ma-md col">Uh-oh!</h4>
    <p class="col text-body1">You look lost on your journey!</p>
    <base-button to="/" class="col" label="Go back home" />
  </div>
</template>

<style lang="scss" scoped></style>
