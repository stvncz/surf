<script setup>
defineProps({
  spot: Object,
  selected: Boolean
})

const emit = defineEmits(['select'])

const getCatchyText = (status, nom) => {
  switch (status) {
    case 'excellent': return `🔥 Conditions parfaites à ${nom} !`
    case 'bon': return `✅ Bon moment pour aller surfer à ${nom}`
    case 'moyen': return `😐 Conditions moyennes à ${nom}`
    case 'mauvais': return `❌ Pas top à ${nom}`
    default: return `🤔 Conditions incertaines à ${nom}`
  }
}
</script>

<template>
  <div
    class="relative h-64 rounded-xl overflow-hidden cursor-pointer border-4 transition duration-500 ease-in-out
           hover:scale-[1.07] hover:brightness-110
           focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400
           border-transparent"
    
    tabindex="0"
    @click="emit('select', spot)"
    @keydown.enter.prevent="emit('select', spot)"
  >
    <img
      :src="`/${spot.image}`"
      alt="Spot"
      class="absolute inset-0 w-full h-full object-cover transition duration-500"
    />
    <div class="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
      <h2 class="text-lg font-bold">{{ spot.nom }}</h2>
      <p class="italic text-sm mb-2">{{ getCatchyText(spot.status, spot.nom) }}</p>
      <div class="text-xs opacity-90">
        <p>🌊 {{ spot.houle }}</p>
        <p>💨 {{ spot.vent }}</p>
        <p>🌙 {{ spot.maree }}</p>
      </div>
    </div>
  </div>
</template>
