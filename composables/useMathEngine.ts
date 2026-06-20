export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'

export interface MathProblem {
  num1: number
  num2: number
  operation: Operation
  answer: number
  options: number[]
}

export function useMathEngine() {
  const generateProblem = (operation: Operation, level: number): MathProblem => {
    let num1 = 0
    let num2 = 0
    let answer = 0
    
    // Scale difficulty based on level
    const maxVal = level * 10

    switch (operation) {
      case 'addition':
        num1 = Math.floor(Math.random() * maxVal) + 1
        num2 = Math.floor(Math.random() * maxVal) + 1
        answer = num1 + num2
        break
      case 'subtraction':
        num1 = Math.floor(Math.random() * maxVal) + 1
        num2 = Math.floor(Math.random() * maxVal) + 1
        // Ensure positive answers for kids
        if (num1 < num2) [num1, num2] = [num2, num1]
        answer = num1 - num2
        break
      case 'multiplication':
        num1 = Math.floor(Math.random() * (level * 2 + 2)) + 1
        num2 = Math.floor(Math.random() * 10) + 1
        answer = num1 * num2
        break
      case 'division':
        num2 = Math.floor(Math.random() * 10) + 1
        answer = Math.floor(Math.random() * (level * 2 + 2)) + 1
        num1 = num2 * answer
        break
    }

    const options = generateOptions(answer, operation, maxVal)

    return {
      num1,
      num2,
      operation,
      answer,
      options
    }
  }

  const generateOptions = (correctAnswer: number, operation: Operation, maxVal: number): number[] => {
    const opts = new Set<number>()
    opts.add(correctAnswer)
    
    while (opts.size < 4) {
      let offset = Math.floor(Math.random() * 10) + 1
      let sign = Math.random() > 0.5 ? 1 : -1
      let fakeAnswer = correctAnswer + (offset * sign)
      
      if (fakeAnswer >= 0) {
        opts.add(fakeAnswer)
      }
    }
    
    // Shuffle
    return Array.from(opts).sort(() => Math.random() - 0.5)
  }

  const getOperationSymbol = (op: Operation) => {
    switch (op) {
      case 'addition': return '+'
      case 'subtraction': return '-'
      case 'multiplication': return '×'
      case 'division': return '÷'
    }
  }

  return {
    generateProblem,
    getOperationSymbol
  }
}
