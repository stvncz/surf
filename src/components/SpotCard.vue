<script setup>

defineProps({
  spot: Object,
  flipped: Boolean
})

const emit = defineEmits(['toggle'])

const baseUrl = import.meta.env.BASE_URL

</script>

<template>
  <div
    class="relative w-full h-64 perspective"
    tabindex="0"
  >
    <div
      class="relative w-full h-full transition-transform duration-500 transform-style preserve-3d"
      :class="{ 'rotate-y-180': flipped }"
    >
      <!-- Face avant -->
      <div
        class="absolute w-full h-full backface-hidden cursor-pointer rounded-xl overflow-hidden shadow-lg"
        @click="emit('toggle', spot)"
        @keydown.enter.prevent="emit('toggle', spot)"
        tabindex="0"
      >
        <img :src="`${baseUrl}${spot.image}`" alt="Spot" class="w-full h-full object-cover" />
        <div class="absolute bottom-0 w-full bg-black/60 text-white p-3 text-center font-bold text-lg">
          {{ spot.nom }}
        </div>
      </div>

      <!-- Face arrière -->
      <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 text-black rounded-xl p-4 flex flex-col justify-center shadow-lg">
        <h3 class="text-xl font-bold mb-2">{{ spot.nom }}</h3>
        <ul class="text-sm space-y-1">
          <li>🌊 Houle : {{ spot.houle }}</li>
          <li>💨 Vent : {{ spot.vent }}</li>
          <li>🌙 Marée : {{ spot.maree }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>

