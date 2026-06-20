export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division'

export interface MathProblem {
  num1: number
  num2: number
  operation: Operation
  answer: number
  options: number[]
}

export interface MixedMathProblem {
  expression: (number | string)[]
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

  const generateMixedProblem = (allowedOps: Operation[], level: number): MixedMathProblem => {
    const numOperands = Math.min(5, 2 + Math.ceil(level / 3))
    const maxVal = Math.min(20, level * 5)
    
    let expression: (number | string)[] = []
    let answer = -1
    
    // We'll retry until we get a clean positive integer answer
    while (answer < 0 || !Number.isInteger(answer)) {
      expression = []
      let jsExpression = ''
      
      let currentVal = Math.floor(Math.random() * maxVal) + 1
      expression.push(currentVal)
      jsExpression += currentVal
      
      for (let i = 1; i < numOperands; i++) {
        const op = allowedOps[Math.floor(Math.random() * allowedOps.length)]
        let nextVal = Math.floor(Math.random() * maxVal) + 1
        
        // Help ensure division is somewhat clean by occasionally forcing multiples,
        // but we'll just rely on the retry loop to filter out decimals for simplicity.
        // Actually, if division, let's just make the next value a random 1-10.
        if (op === 'division') {
            nextVal = Math.floor(Math.random() * 10) + 1
        }
        
        const symbol = getOperationSymbol(op)
        expression.push(symbol)
        expression.push(nextVal)
        
        const jsOp = op === 'addition' ? '+' : op === 'subtraction' ? '-' : op === 'multiplication' ? '*' : '/'
        jsExpression += ` ${jsOp} ${nextVal}`
      }
      
      try {
        answer = Function(`"use strict"; return (${jsExpression})`)()
      } catch (e) {
        answer = -1
      }
    }

    const options = generateOptions(answer, allowedOps[0] || 'addition', maxVal)

    return {
      expression,
      answer,
      options
    }
  }

  return {
    generateProblem,
    generateMixedProblem,
    getOperationSymbol
  }
}
