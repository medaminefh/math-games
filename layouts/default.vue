<template>
  <div :dir="htmlDir" :class="[htmlDir, 'min-h-screen min-h-dvh flex flex-col transition-colors duration-300']">
    <TopBar />
    <main class="flex-grow w-full max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 safe-bottom">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '#imports'

const { localeProperties } = useI18n()

const htmlDir = computed(() => localeProperties.value.dir || 'ltr')

useHead({
  htmlAttrs: {
    dir: htmlDir,
    lang: computed(() => localeProperties.value.iso)
  }
})
</script>
