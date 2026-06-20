import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useProgressStore = defineStore('progress', () => {
  const score = useLocalStorage('math_game_score', 0)
  const level = useLocalStorage('math_game_level', 1)
  const streak = useLocalStorage('math_game_streak', 0)

  function incrementScore(points: number = 10) {
    score.value += points
    streak.value += 1
    
    // Simple level up logic
    if (score.value >= level.value * 100) {
      level.value += 1
    }
  }

  function resetStreak() {
    streak.value = 0
  }

  return {
    score,
    level,
    streak,
    incrementScore,
    resetStreak
  }
})
