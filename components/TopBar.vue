<template>
  <header class="bg-white shadow-sm rounded-b-2xl sm:rounded-b-3xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-10">
    <!-- Score & Streak -->
    <div class="flex items-center gap-1.5 sm:gap-2 md:gap-4">
      <div class="flex items-center bg-primary-light/20 text-primary-dark px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs sm:text-sm md:text-base">
        <Star class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 me-1 md:me-2 text-primary" />
        <span class="hidden sm:inline">{{ t('score') }}:&nbsp;</span>
        <span class="text-sm sm:text-lg md:text-xl font-black">{{ score }}</span>
      </div>
      <div class="flex items-center bg-secondary-light/20 text-secondary-dark px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs sm:text-sm md:text-base">
        <Flame class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 me-1 md:me-2 text-secondary" />
        <span class="hidden sm:inline">{{ t('streak') }}:&nbsp;</span>
        <span class="text-sm sm:text-lg md:text-xl font-black">{{ streak }}</span>
      </div>
    </div>

    <!-- Language Switcher -->
    <div class="flex gap-1 sm:gap-2">
      <button 
        v-for="loc in locales" 
        :key="loc.code"
        @click="setLocale(loc.code)"
        :class="[
          'px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-bold transition-all duration-150 text-xs sm:text-sm active:scale-95',
          locale === loc.code ? 'bg-success text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
        ]"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProgressStore } from '~/stores/progress'
import { useI18n } from '#imports'
import { Star, Flame } from 'lucide-vue-next'

const { t, locale, locales, setLocale } = useI18n()
const progressStore = useProgressStore()
const { score, streak } = storeToRefs(progressStore)
</script>
