<template>
  <div class="flex flex-col items-center max-w-3xl mx-auto pt-2 sm:pt-4 md:pt-8">
    <!-- Header -->
    <div class="flex justify-between w-full items-center mb-6 sm:mb-8 md:mb-12">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-primary font-bold text-base sm:text-lg md:text-xl transition-colors active:scale-95">
        <ArrowLeft class="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
        {{ t('back') }}
      </NuxtLink>
      <div class="bg-warning text-slate-800 px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-sm border-2 border-warning/50">
        {{ t('level') }} {{ level }}
      </div>
    </div>

    <!-- Math Problem -->
    <div v-if="problem" class="problem-container bg-white rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-8 md:p-12 shadow-2xl w-full text-center border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-slate-200 mb-6 sm:mb-8 md:mb-12 relative overflow-hidden">
      <!-- Success Overlay -->
      <div v-if="showSuccess" class="absolute inset-0 bg-success/10 flex items-center justify-center z-10 backdrop-blur-sm transition-all duration-300">
        <div class="bg-white rounded-full p-4 sm:p-6 shadow-xl animate-bounce">
          <Check class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-success" />
        </div>
      </div>
      
      <!-- Error Overlay -->
      <div v-if="showError" class="absolute inset-0 bg-danger/10 flex items-center justify-center z-10 backdrop-blur-sm transition-all duration-300">
        <div class="bg-white rounded-full p-4 sm:p-6 shadow-xl animate-shake">
          <X class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-danger" />
        </div>
      </div>

      <div class="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-relaxed font-display font-black text-slate-800 flex justify-center items-center flex-wrap gap-2 sm:gap-4 md:gap-8 dir-ltr py-2 sm:py-4">
        <span>{{ problem.num1 }}</span>
        <span :class="operationColor">{{ getOperationSymbol(operation) }}</span>
        <span>{{ problem.num2 }}</span>
        <span class="text-slate-300">=</span>
        <span class="text-primary underline decoration-dashed underline-offset-4 sm:underline-offset-8">?</span>
      </div>
    </div>

    <!-- Options Grid -->
    <div v-if="problem" class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full options-container">
      <button
        v-for="(opt, idx) in problem.options"
        :key="idx"
        @click="selectAnswer(opt)"
        :disabled="isAnimating"
        class="relative overflow-hidden group bg-white text-2xl sm:text-3xl md:text-4xl font-black text-slate-700 py-4 sm:py-6 md:py-8 rounded-2xl sm:rounded-3xl shadow-lg border-b-4 sm:border-b-[6px] md:border-b-8 border-slate-200 hover:border-b-0 hover:translate-y-1 md:hover:translate-y-2 hover:bg-slate-50 transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ opt }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n, useLocalePath, useSeoMeta } from '#imports'
import { ArrowLeft, Check, X } from 'lucide-vue-next'
import { useProgressStore } from '~/stores/progress'
import { useMathEngine } from '~/composables/useMathEngine'
import { triggerConfetti } from '~/composables/useConfetti'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const progressStore = useProgressStore()
const { level } = storeToRefs(progressStore)
const { generateProblem, getOperationSymbol } = useMathEngine()

const operation = route.params.operation || 'addition'
const problem = ref(null)
const isAnimating = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

const operationColor = computed(() => {
  switch (operation) {
    case 'addition': return 'text-[#FF5722]'
    case 'subtraction': return 'text-[#03A9F4]'
    case 'multiplication': return 'text-[#81C784]'
    case 'division': return 'text-[#9C27B0]'
    default: return 'text-primary'
  }
})

useSeoMeta({
  title: () => t(operation),
  description: `Practice ${operation} and earn points!`
})

const createNewProblem = () => {
  problem.value = generateProblem(operation, level.value)
  
  gsap.fromTo('.problem-container', 
    { scale: 0.8, opacity: 0, rotationX: -20 }, 
    { scale: 1, opacity: 1, rotationX: 0, duration: 0.6, ease: 'elastic.out(1, 0.7)' }
  )
  gsap.fromTo('.options-container button', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' }
  )
}

const selectAnswer = (answer) => {
  if (isAnimating.value) return
  isAnimating.value = true

  if (answer === problem.value.answer) {
    showSuccess.value = true
    triggerConfetti()
    progressStore.incrementScore(10)
    
    gsap.to('.problem-container', {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setTimeout(() => {
          showSuccess.value = false
          isAnimating.value = false
          createNewProblem()
        }, 800)
      }
    })
  } else {
    showError.value = true
    progressStore.resetStreak()
    
    gsap.to('.problem-container', {
      x: [-10, 10, -10, 10, 0],
      duration: 0.4,
      ease: 'power1.inOut',
      onComplete: () => {
        setTimeout(() => {
          showError.value = false
          isAnimating.value = false
        }, 500)
      }
    })
  }
}

onMounted(() => {
  createNewProblem()
})
</script>

<style scoped>
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
