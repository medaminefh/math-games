<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] py-4 sm:py-8">
    <!-- Header -->
    <div class="text-center mb-6 sm:mb-8 md:mb-12 px-4">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-primary mb-1 sm:mb-2 md:mb-4 drop-shadow-sm gs-title leading-tight">
        {{ t('welcome') }}
      </h1>
      <p class="text-base sm:text-xl md:text-2xl text-slate-500 font-bold gs-subtitle">{{ t('selectGame') }}</p>
    </div>

    <!-- Game Mode Cards -->
    <div class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-4xl px-2 sm:px-4">
      <NuxtLink 
        v-for="mode in modes" 
        :key="mode.id"
        :to="localePath(`/games/${mode.id}`)"
        class="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-b-4 sm:border-b-[6px] md:border-b-8 active:translate-y-1 active:border-b-0 cursor-pointer gs-card"
        :style="{ borderColor: mode.color }"
      >
        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6">
          <div 
            class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex shrink-0 items-center justify-center text-2xl sm:text-3xl md:text-4xl text-white shadow-inner"
            :style="{ backgroundColor: mode.color }"
          >
            {{ mode.symbol }}
          </div>
          <h2 class="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors text-center sm:text-start">
            {{ t(mode.id) }}
          </h2>
        </div>
      </NuxtLink>
    </div>

    <!-- Challenge Mode Card -->
    <div class="mt-4 sm:mt-6 md:mt-8 w-full max-w-4xl px-2 sm:px-4 gs-challenge">
      <NuxtLink 
        :to="localePath(`/games/${challengeMode.id}`)"
        class="group block relative bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-b-4 sm:border-b-[6px] md:border-b-8 border-orange-600 active:translate-y-1 active:border-b-0 cursor-pointer"
      >
        <div class="flex items-center gap-3 sm:gap-4 md:gap-6">
          <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl text-white shadow-inner">
            {{ challengeMode.symbol }}
          </div>
          <div class="min-w-0">
            <h2 class="text-lg sm:text-2xl md:text-3xl font-bold text-white group-hover:text-amber-50 transition-colors drop-shadow-sm truncate">
              {{ t('challengeMode') }}
            </h2>
            <p class="text-amber-100 font-bold mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base truncate">{{ t('challengeDesc') }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n, useLocalePath, useSeoMeta } from '#imports'
import gsap from 'gsap'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('welcome'),
  description: 'Select a math game to play and improve your skills.'
})

const modes = [
  { id: 'addition', symbol: '+', color: '#FF5722' },
  { id: 'subtraction', symbol: '-', color: '#03A9F4' },
  { id: 'multiplication', symbol: '×', color: '#81C784' },
  { id: 'division', symbol: '÷', color: '#9C27B0' },
]

const challengeMode = { id: 'challenge-setup', symbol: '★', color: '#F59E0B' }

onMounted(() => {
  const tl = gsap.timeline()
  tl.fromTo('.gs-title', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
    .fromTo('.gs-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.4')
    .fromTo('.gs-card', 
      { y: 50, opacity: 0, scale: 0.9 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
      '-=0.3'
    )
    .fromTo('.gs-challenge', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      '-=0.2'
    )
})
</script>
