<template>
  <div class="flex flex-col items-center min-h-[60vh] max-w-2xl mx-auto py-4 sm:py-8">
    <!-- Back Button -->
    <div class="w-full flex justify-start mb-4 sm:mb-6 md:mb-8">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-primary font-bold text-base sm:text-lg md:text-xl transition-colors active:scale-95">
        <ArrowLeft class="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
        {{ t('back') }}
      </NuxtLink>
    </div>

    <!-- Setup Card -->
    <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl w-full border-b-4 sm:border-b-[6px] md:border-b-8 border-slate-200 gs-container">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-display font-black text-slate-800 mb-1 sm:mb-2 text-center">
        {{ t('challengeMode') }}
      </h1>
      <p class="text-slate-500 text-center mb-4 sm:mb-6 md:mb-8 font-bold text-xs sm:text-sm md:text-base">
        {{ t('selectOperations') }}
      </p>

      <!-- Operation Toggle Buttons -->
      <div class="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
        <button 
          v-for="op in availableOps" 
          :key="op.id"
          @click="toggleOperation(op.id)"
          :class="[
            'p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border-[3px] sm:border-4 font-bold text-sm sm:text-base md:text-xl transition-all duration-200 flex items-center gap-2 sm:gap-3 md:gap-4 active:scale-95',
            selectedOps.includes(op.id) 
              ? 'border-primary bg-primary-light/10 text-primary-dark shadow-inner' 
              : 'border-slate-100 bg-slate-50 text-slate-400'
          ]"
        >
          <div :class="[
            'w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-lg sm:text-2xl text-white',
            selectedOps.includes(op.id) ? 'bg-primary' : 'bg-slate-300'
          ]">
            {{ op.symbol }}
          </div>
          <span class="truncate">{{ t(op.id) }}</span>
        </button>
      </div>

      <!-- Number of Operands Slider -->
      <div class="mb-4 sm:mb-6 md:mb-8 bg-slate-50 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 border-slate-100">
        <div class="flex justify-between items-center mb-3 sm:mb-4">
          <label class="text-slate-600 font-bold text-sm sm:text-base md:text-lg">{{ t('operandCount') }}</label>
          <span class="bg-primary text-white font-black px-3 py-0.5 sm:py-1 rounded-full text-base sm:text-lg md:text-xl min-w-[2.5rem] text-center">{{ operandCount }}</span>
        </div>
        <input 
          type="range" 
          v-model.number="operandCount" 
          min="3" 
          max="7" 
          class="w-full bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-slate-400 font-bold mt-1.5 sm:mt-2 px-1 text-xs sm:text-sm">
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
        </div>
      </div>

      <!-- Start Button -->
      <div class="flex flex-col items-center">
        <button 
          @click="startChallenge"
          :disabled="selectedOps.length === 0"
          class="bg-success w-full text-white font-black text-lg sm:text-xl md:text-2xl py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-full shadow-lg hover:shadow-xl hover:bg-green-500 hover:-translate-y-1 transition-all duration-200 active:translate-y-0.5 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {{ t('startChallenge') }}
        </button>
        <p v-if="showError" class="text-danger font-bold mt-3 sm:mt-4 animate-pulse text-sm sm:text-base">
          {{ t('minOneOperation') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n, useLocalePath, useSeoMeta } from '#imports'
import { ArrowLeft } from 'lucide-vue-next'
import gsap from 'gsap'

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('challengeMode'),
  description: 'Setup your custom math challenge.'
})

const availableOps = [
  { id: 'addition', symbol: '+' },
  { id: 'subtraction', symbol: '-' },
  { id: 'multiplication', symbol: '×' },
  { id: 'division', symbol: '÷' },
]

const selectedOps = ref(['addition', 'subtraction'])
const operandCount = ref(3)
const showError = ref(false)

const toggleOperation = (id) => {
  const idx = selectedOps.value.indexOf(id)
  if (idx > -1) {
    selectedOps.value.splice(idx, 1)
  } else {
    selectedOps.value.push(id)
  }
  if (selectedOps.value.length > 0) showError.value = false
}

const startChallenge = () => {
  if (selectedOps.value.length === 0) {
    showError.value = true
    return
  }
  router.push({
    path: localePath('/games/challenge'),
    query: { ops: selectedOps.value.join(','), count: operandCount.value }
  })
}

onMounted(() => {
  gsap.fromTo('.gs-container', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
  )
})
</script>
