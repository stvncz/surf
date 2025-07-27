<script setup>
import { ref, onMounted } from 'vue'
import SpotCard from './components/SpotCard.vue'
import spotsData from './data/spots.json'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const spots = ref([])
const spotActif = ref(null)
const flippedId = ref(null)

const baseUrl = import.meta.env.BASE_URL

onMounted(() => {
  spots.value = spotsData
  spotActif.value = spotsData[0] // Par défaut le premier
  flippedId.value = spotActif.value.id
})

function toggleSpot(spot) {
  if (flippedId.value === spot.id) {
    flippedId.value = null
    spotActif.value = null
  } else {
    flippedId.value = spot.id
    spotActif.value = spot
  }
}
</script>

<template>
  <!-- Fond dynamique -->
  <div
    v-if="spotActif"
    class="fixed inset-0 -z-10 transition-all duration-700"
  >
    <img
       :src="`${baseUrl}${spotActif.image}`"
      alt="Fond"
      class="w-full h-full object-cover brightness-50"
    />
  </div>

  <!-- Contenu -->
  <main class="min-h-screen p-6 text-white">
    <h1 class="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">Surf Report Finistère</h1>
     <Swiper
      spaceBetween="20"
      slidesPerView="auto"
      pagination
      class="max-w-6xl mx-auto"
    >
      <SwiperSlide
        v-for="spot in spots"
        :key="spot.id"
        style="width: 280px"
      >
      <div class="pt-4 pb-4">
        <SpotCard
          :spot="spot"
          :flipped="spot.id === flippedId"
          @toggle="toggleSpot"
        />
      </div>
      </SwiperSlide>
    </Swiper>
  </main>
</template>


