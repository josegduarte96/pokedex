<script setup>
  import BaseButton from "src/components/BaseButton.vue"
</script>

<template>
  <q-page class="flex justify-center">
    <div class="row justify-center">
      <div class="col-10 col-sm-8 self-center">
        <q-img
          fit=""
          alt="Pokemon Pikachu"
          src="~assets/pikachu.svg" />
      </div>
      <div class="col-12 column items-center">
        <h4 class="text-bold q-ma-none">Welcome to Pokédex</h4>
        <p
          style="max-width: 570px"
          class="text-body1 text-center q-pa-lg">
          The digital encyclopedia created by Professor Oak is an invaluable
          tool to Trainers in the Pokémon world.
        </p>
        <base-button
          size="lg"
          label="Get Started"
          to="/pokemons-list" />
      </div>
    </div>
  </q-page>
</template>
