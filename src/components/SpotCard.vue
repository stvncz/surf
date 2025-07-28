<script setup>
import { ref, watch, toRef } from 'vue'
import { getSurfConditions } from '../services/weatherapi.js'

const props = defineProps({
  spot: Object,
  flipped: Boolean
})

const emit = defineEmits(['toggle'])

const baseUrl = import.meta.env.BASE_URL

const surfData = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    console.log('Fetching surf conditions for:', props.spot.lat, props.spot.lng)
    surfData.value = await getSurfConditions(props.spot.lat, props.spot.lng)
  } catch (err) {
    error.value = 'Erreur chargement météo' + err.message
  } finally {
    console.log('finally')
    loading.value = false
  }
}

watch(
  () => [props.spot?.lat, props.spot?.lng],
  ([lat, lng]) => {
    if (lat && lng) {
      fetchData(lat, lng)
    }
  },
  { immediate: true }
)

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
      <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 opacity-70 text-black rounded-xl p-4 flex flex-col justify-center shadow-lg">
        <h3 class="text-xl font-bold mb-2">{{ spot.nom }}</h3>
        <div v-if="loading" class="text-center">Chargement météo...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="surfData">
          <ul class="text-sm space-y-1">
            <li>🌡️ Température : {{ surfData.current.temp_c }} °C</li>
            <li>💨 Vent : {{ surfData.current.wind_kph }} km/h ({{ surfData.current.wind_dir }})</li>
            <li>💧 Humidité : {{ surfData.current.humidity }}%</li>
          </ul>
        </div>
        <div v-else>Aucune donnée</div>
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

