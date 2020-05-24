// This file is responsible for UX for inputing numbers and operators

const output = document.getElementById('output')
const bsp = document.getElementById('backspace')
// This variable is used to store the latest operator the user entered
let lastOp = ''

// Sets the value to the input field
function setVal(char) {
  let input = output.value
  output.value += validateKey(char, input)
  changeFontSize()
}

// removes one character in the inputfield
function backSpace(e) {
  let caret = e.target.selectionStart
  let temp = output.value.split('')

  temp.splice(caret - 1, 1)
  output.value = temp.join('')
  changeFontSize()
  e.target.selectionEnd = caret - 1
}

// Deletes all the contents in the input field
function clearAll() {
  output.value = ""
  changeFontSize()
}

// Solves the function
function solve() {
  let x = output.value
  let lastVal = x.charAt(x.length - 1)
  if (isOp(lastVal)) { // this just to prevent NaN output
    output.value = ''
  } else {
    if (x) {
      let tokens = lexer.tokenize(x)
      let ans = evaluate(tokens)
      output.value = ans
    }
  }
  changeFontSize()
}

// Function to run in event listener for the input field. Avoids unnecessary keys to be displayed
function isAllowed(e) {
  let key = e.keyCode
  changeFontSize()
  // console.log(key)

  if (key === 39) {
    e.target.selectionStart++
  }

  if (key === 37) {
    if (e.target.selectionEnd !== 0) {
      e.target.selectionEnd--
    }
  }

  if (key === 8) {
    backSpace(e)
  }

  if (key === 46) {
    clearAll()
  }

  if (key === 13) {
    solve()
  }

  if (key === 56 && e.shiftKey || key === 106) {
    currentOp = '*'
    setVal('*')
  }

  if (key === 187 && e.shiftKey || key === 107) {
    currentOp = '+'
    setVal('+')
  }

  if (key === 189 || key === 109) {
    currentOp = '-'
    setVal('-')
  }

  if (key === 111 || key === 191) {
    currentOp = '/'
    setVal('/')
  }

  if (key === 190 || key === 110) {
    setVal('.')
  }

  if (key === 57 && e.shiftKey) {
    setVal('(')
  }

  if (key === 48 && e.shiftKey) {
    setVal(')')
  }

  if (key === 83) {
    setVal('√')
  }

  if ((key < 48 || key > 57 && key < 96) || (key < 96 && key > 57 || key > 105)) {
    return false
  } else {
    if (!e.shiftKey) {
      return true
    } else {
      return false
    }
  }
}


// Validates inputs
function validateKey(ch, input) {
  let val = input.split('')
  let lastVal = val.pop()

  if (input.length > 20) {
    return ''
  }

  if (isOtherOp(ch)) {
    lastOp = ch
  }

  if (isOp(ch) && isOp(lastVal)) {
    return ''
  }

  if (ch === ')' && lastVal === undefined) {
    return ''
  }

  if ((ch === '-' || ch === '√') && (lastVal === undefined || lastVal === '(')) {
    return ch
  }

  if (isOp(ch) && lastVal === undefined && (ch !== '-' || ch !== '√')) {
    return '0' + ch
  }

  if (ch === '.') {
    return checkDecimal(input)
  }

  if (lastVal === '(' && isOp(ch) && (ch !== '-' || ch !== '√')) {
    return ''
  }

  return ch

}

// Validates deciamal points
function checkDecimal(input) {
  let inputArr = []

  let temp = input.split("")
  inputArr = lastOp !== '' ? temp.slice(temp.lastIndexOf(lastOp) + 1) : temp

  let lastVal = inputArr[inputArr.length - 1]

  if (lastVal === '(') {
    return '0.'
  }

  if (lastVal === '(' || lastVal === ')') {
    return ''
  }

  return !inputArr.includes('.') ? '.' : ''
}

function isOp(ch) {
  return /[.\-+\/*^%√]/.test(ch)
}

function isOtherOp(ch) { // this isOtherOp is used for the sake of decimal point 
  return /[\-+\/*^%√]/.test(ch)
}

// Changes the font size according to the length of the input
function changeFontSize() {
  if (output.value.length > 13) {
    output.style.fontSize = '1.3rem'
  } else {
    output.style.fontSize = '2rem'
  }
}


// Event listeners
// Backspace button event listener
bsp.addEventListener('click', e => {
  backSpace(e)
})