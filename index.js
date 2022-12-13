// Returns Random Number : [min, max]
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let reset = document.getElementById('reset')

reset.addEventListener('click', generateNewArray)

let dropdownToggle = document.querySelector('.dropdown-toggle')
let sortBtn = document.getElementById('sortBtn')
let speedRange = document.getElementById('speedRange')
let arrayRange = document.getElementById('arrayRange')

function disable() {
  dropdownToggle.classList.add('disabled')
  sortBtn.classList.add('disabled')
  speedRange.setAttribute('disabled', '')
  arrayRange.setAttribute('disabled', '')
  document.body.style.cursor = 'now-allowed';
}
function enable() {
  dropdownToggle.classList.remove('disabled')
  sortBtn.classList.remove('disabled')
  speedRange.removeAttribute('disabled')
  arrayRange.removeAttribute('disabled')
  document.body.style.cursor = 'pointer';
}

// Navigation Bar Dropdown Swapping
let A = document.getElementsByClassName('dropdown-item')
let curAlgo = 'Bubble Sort'
for (let i = 0; i < A.length; i++) {
  A[i].addEventListener('click', function () {
    curAlgo = A[i].innerHTML
    A[i].innerHTML = document.getElementById('navbarDropdownMenuLink').innerHTML
    document.getElementById('navbarDropdownMenuLink').innerHTML = curAlgo
  })
}

// Bars
let barsHeight = []
let bars = []
let n = 10
function arraySizeChange(changed) {
  n = changed
  console.log(n)
  generateNewArray()
}
let barsCon = document.querySelector('.barsCon')

// Generation
function generateNewArray() {
  enable()
  barsCon.innerHTML = ''
  if (n > 30) {
    document.documentElement.style.setProperty('--width', '30px')
  } else {
    document.documentElement.style.setProperty('--width', '40px')
  }
  for (let i = 0; i < n; i++) {
    barsHeight[i] = randomNumber(100, 600)
    bars[i] = document.createElement('div')
    bars[i].classList.add('bar')
    barsCon.appendChild(bars[i])
    bars[i].style.height = barsHeight[i] + 'px'
  }
  let i = Math.floor(Math.random() * n)
  barsHeight[i] = 500
  bars[i].style.height = barsHeight[i] + 'px'
}

//Generate New Array Event Listener
document.querySelector('.newArray').addEventListener('click', generateNewArray)

//Visuals
let speed = 50
let c = 0
let delay = 10000 / (Math.floor(n / 10) * speed)

function speedChange(changed) {
  speed = changed
  delay = 10000 / (Math.floor(n / 10) * speed)
  console.log(speed)
}

const anim = (bar, height, color) => {
  setTimeout(() => {
    bar.style.height = height + 'px'
    bar.style.backgroundColor = color
  }, (c += delay + 10))
}

//Sorting Button
sortBtn.addEventListener('click', () => {
  switch (curAlgo) {
    case 'Bubble Sort':
      bubbleSort()
      break
    case 'Selection Sort':
      selectionSort()
      break
    case 'Insertion Sort':
      insertionSort()
      break

    default:
      bubbleSort()
  }
  for (let i = 0; i < n; i++) {
    anim(bars[i], barsHeight[i], 'red')
  }
  for (let i = 0; i < n; i++) {
    anim(bars[i], barsHeight[i], sorted)
  }
  c = 0
})

//Sorting Algorithms

// colors
// let p = 'red'
// let p1 = 'orange'
// let p2 = 'yellow'
// let sorted = 'green'
// let heap = 'whitesmoke'

let p = 'white';
let p1 = 'rgba(255,165,0, 0.9)';
let p2 = 'rgba(255,165,0, 0.9)';
let sorted = 'rgba(0, 164, 86, 0.6)';
let heap = 'whitesmoke';

// Bubble Sort
async function bubbleSort() {
  disable()
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      anim(bars[j], barsHeight[j], p1)
      anim(bars[j + 1], barsHeight[j + 1], p2)

      if (barsHeight[j] > barsHeight[j + 1]) {
        ;[barsHeight[j], barsHeight[j + 1]] = [barsHeight[j + 1], barsHeight[j]]

        anim(bars[j], barsHeight[j], p2)
        anim(bars[j + 1], barsHeight[j + 1], p1)
      }

      anim(bars[j], barsHeight[j], p)
      anim(bars[j + 1], barsHeight[j + 1], p)
    }
    anim(bars[n - 1 - i], barsHeight[n - 1 - i], sorted)
  }
  //sorted region
  anim(bars[0], barsHeight[0], sorted);
  
}

// Selection Sort
function selectionSort() {
  disable()

  for (let i = 0; i < n - 1; i++) {
    let min = i

    for (let j = n - 1; j > i; j--) {
      anim(bars[j], barsHeight[j], p1)

      if (barsHeight[j] < barsHeight[min]) min = j
      anim(bars[j], barsHeight[j], p)
    }

    ;[barsHeight[i], barsHeight[min]] = [barsHeight[min], barsHeight[i]]

    anim(bars[i], barsHeight[i], sorted)

    if (min != i) anim(bars[min], barsHeight[min], p)
  }
  //sorted region
  anim(bars[n - 1], barsHeight[n - 1], sorted)
}

//Insertion Sort
function insertionSort() {
  disable()

  for (let i = 0; i < n; i++) {
    let no = barsHeight[i]
    anim(bars[i], barsHeight[i], p2)
    let j = i - 1
    for (j = i - 1; j >= 0 && barsHeight[j] > no; j--) {
      barsHeight[j + 1] = barsHeight[j]
      anim(bars[j], barsHeight[j], p1)
      anim(bars[j + 1], barsHeight[j + 1], p2)
      anim(bars[j + 1], barsHeight[j + 1], sorted)
      anim(bars[j], barsHeight[j], sorted)
    }
    barsHeight[j + 1] = no

    anim(bars[i], barsHeight[i], p1)
    anim(bars[i], barsHeight[i], sorted)
    anim(bars[j + 1], barsHeight[j + 1], p2)
    anim(bars[j + 1], barsHeight[j + 1], sorted)
  }
}
generateNewArray()