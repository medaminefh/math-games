<template>
  <header class="bg-white shadow-sm rounded-b-3xl px-6 py-4 flex items-center justify-between sticky top-0 z-10">
    <!-- Score & Streak -->
    <div class="flex items-center gap-4">
      <div class="flex items-center bg-primary-light/20 text-primary-dark px-4 py-2 rounded-full font-bold">
        <Star class="w-5 h-5 me-2 text-primary" />
        {{ t('score') }}: <span class="ms-1 text-xl">{{ score }}</span>
      </div>
      <div class="flex items-center bg-secondary-light/20 text-secondary-dark px-4 py-2 rounded-full font-bold">
        <Flame class="w-5 h-5 me-2 text-secondary" />
        {{ t('streak') }}: <span class="ms-1 text-xl">{{ streak }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-3">
      <!-- Language Switcher -->
      <div class="flex gap-2">
        <button 
          v-for="loc in locales" 
          :key="loc.code"
          @click="setLocale(loc.code)"
          :class="[
            'px-3 py-1 rounded-full font-bold transition-transform hover:scale-110',
            locale === loc.code ? 'bg-success text-white' : 'bg-slate-100 text-slate-500'
          ]"
        >
          {{ loc.code.toUpperCase() }}
        </button>
      </div>
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
