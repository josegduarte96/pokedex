<script setup></script>
<template>
  <div class="flex flex-center">
    <div class="absolute-center">
      <q-img class="rotate" height="200px" fit="scale-down" alt="pokebola" src="~assets/pokebola.svg" />
      <div class="bg-transparent text-dark text-body1 text-bold text-center">Loading...</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rotate {
  width: 100px;
  animation: rotate 0.8s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
