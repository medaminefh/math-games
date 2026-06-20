<template>
  <div :dir="htmlDir" :class="[htmlDir, 'min-h-screen flex flex-col transition-colors duration-300']">
    <TopBar />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '#imports'

const { localeProperties } = useI18n()

// Dynamically compute the direction based on the current locale
const htmlDir = computed(() => localeProperties.value.dir || 'ltr')

useHead({
  htmlAttrs: {
    dir: htmlDir,
    lang: computed(() => localeProperties.value.iso)
  }
})
</script>
