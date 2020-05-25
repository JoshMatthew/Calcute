// This file is responsible for UX aesthetics
const lightAnim = document.getElementById('btn-switch')
const lights = document.getElementById('btn-switch-2')

const numbers = document.querySelectorAll('.number')
const number = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operators')
const radios = document.querySelectorAll('.radio-btn')
const equal = document.getElementById('equal')
const clear = document.getElementById('clear')

// Sets default numpad color to white
let currentColor = 'numbers-white'

// Toggles light animation for numpads
lightAnim.addEventListener('click', () => {
  lightAnim.classList.toggle('switch-on')
  changingLights()
  turnOffRadio()
})


// Event listener for when a radio button's status is changed
// Change the color of the numpad
radios.forEach(radio => {
  radio.addEventListener('change', e => {
    switch (radio.value) {
      case 'white':
        changeColor(currentColor, 'numbers-white')
        currentColor = 'numbers-white'
        break;
      case 'blue':
        changeColor(currentColor, 'numbers-blue')
        currentColor = 'numbers-blue'
        break;
      case 'red':
        changeColor(currentColor, 'numbers-red')
        currentColor = 'numbers-red'
        break;
      case 'yellow':
        changeColor(currentColor, 'numbers-yellow')
        currentColor = 'numbers-yellow'
        break;
      case 'pink':
        changeColor(currentColor, 'numbers-pink')
        currentColor = 'numbers-pink'
        break;
      case 'green':
        changeColor(currentColor, 'numbers-green')
        currentColor = 'numbers-green'
        break;
      default:
        break
    }
  })
})


// Helper function to change numpad color
function changeColor(prevColor, newColor) {
  numbers.forEach(number => {
    number.classList.replace(prevColor, newColor)
  })
}

// Turns the lights on or off
lights.addEventListener('click', () => {
  lights.classList.toggle('switch-on')
  otherLightSwitch() // light switch for non-numpad
  if (lights.classList.contains('switch-on')) {
    lightOn()
  } else {
    lightOff()
  }
})

// helper function to turn numpad light off
function lightOff() {
  numbers.forEach(number => {
    number.style.textShadow = 'none'
  })
}

// helper function to turn numpad light on
function lightOn() {
  numbers.forEach(number => {
    number.style.textShadow = `0 0 10px ${getCurrentColor()}`
  })
}

// helper function to turn on or off non-numpad buttons
function otherLightSwitch() {
  operators.forEach(operator => {
    operator.classList.toggle('operator-light-it')
  })

  equal.classList.toggle('equal-light-it')
  clear.classList.toggle('clear-light-it')
}


// helper funtion for light animation
function changingLights() {
  numbers.forEach(number => {
    setTimeout(() => {
      number.classList.toggle('number-light-animation')
    }, Math.random() * (700 - 100) + 100);
  })
}

// turns on or off radio button
function turnOffRadio() {
  radios.forEach(radio => {
    radio.disabled = !radio.disabled
  })
}

// gets the current color
function getCurrentColor() {
  return number[0].style.color
}