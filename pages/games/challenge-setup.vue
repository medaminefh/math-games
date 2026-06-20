<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-4">
    <div class="w-full flex justify-start mb-8">
      <NuxtLink :to="localePath('/')" class="btn-back flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-xl transition-colors">
        <ArrowLeft class="w-6 h-6 rtl:rotate-180" />
        {{ t('back') }}
      </NuxtLink>
    </div>

    <div class="bg-white rounded-3xl p-8 shadow-xl w-full border-b-8 border-slate-200 gs-container">
      <h1 class="text-3xl font-display font-black text-slate-800 mb-2 text-center">
        {{ t('challengeMode') }}
      </h1>
      <p class="text-slate-500 text-center mb-8 font-bold">
        {{ t('selectOperations') }}
      </p>

      <div class="grid grid-cols-2 gap-4 mb-8">
        <button 
          v-for="op in availableOps" 
          :key="op.id"
          @click="toggleOperation(op.id)"
          :class="[
            'p-4 rounded-2xl border-4 font-bold text-xl transition-all duration-200 flex items-center gap-4',
            selectedOps.includes(op.id) 
              ? 'border-primary bg-primary-light/10 text-primary-dark shadow-inner' 
              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-primary-light/50 hover:bg-slate-100'
          ]"
        >
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-2xl text-white',
            selectedOps.includes(op.id) ? 'bg-primary' : 'bg-slate-300'
          ]">
            {{ op.symbol }}
          </div>
          {{ t(op.id) }}
        </button>
      </div>

      <div class="flex flex-col items-center">
        <button 
          @click="startChallenge"
          :disabled="selectedOps.length === 0"
          class="bg-success text-white font-black text-2xl py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:bg-green-500 hover:-translate-y-1 transition-all duration-200 active:translate-y-1 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {{ t('startChallenge') }}
        </button>
        <p v-if="showError" class="text-danger font-bold mt-4 animate-pulse">
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

// Default to addition and subtraction selected
const selectedOps = ref(['addition', 'subtraction'])
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
  // Store selected operations in localStorage or pass via query
  // Passing via query string is easiest for sharing/refreshing
  router.push({
    path: localePath('/games/challenge'),
    query: { ops: selectedOps.value.join(',') }
  })
}

onMounted(() => {
  gsap.fromTo('.gs-container', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.2)' }
  )
})
</script>
