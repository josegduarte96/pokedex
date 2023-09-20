<script setup>
  defineProps({
    label: String,
    to: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: "accent",
    },
    icon: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      default: "md",
    },
    round: {
      type: Boolean,
      default: false,
    },
  })

  defineEmits(["click"])
</script>
<template>
  <q-btn
    :to="to"
    class="items-center"
    @click="$emit('click')"
    :ripple="{ color: 'negative' }"
    no-caps
    unelevated
    :size="size"
    :rounded="!round"
    :round="round"
    :color="color">
    <div class="flex justify-center items-center q-col-gutter-x-sm">
      <slot />
      <span>{{ label }}</span>
    </div>
  </q-btn>
</template>

<style lang="scss" scoped></style>
