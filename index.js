// DOM Elements
const barsCon = document.querySelector('.barsCon');
const arrayRange = document.getElementById('arrayRange');
const speedRange = document.getElementById('speedRange');
const newArrayBtn = document.querySelector('.newArray');
const sortBtn = document.getElementById('sortBtn');
const algoSelect = document.getElementById('algoSelect');

// State
let n = parseInt(arrayRange.value);
let speed = parseInt(speedRange.value);
let barsHeight = [];
let bars = [];
let c = 0;
let curAlgo = 'Bubble Sort';
let timeouts = []; // Store all animation timeouts

// Colors (Monochrome Aesthetic)
const PRIMARY_COLOR = '#1a1a1a'; // Dark Gray / Black
const COMPARE_COLOR = '#d4d4d4'; // Light Gray
const SWAP_COLOR = '#737373';    // Medium Gray
const SORTED_COLOR = '#000000';  // Pure Black

// Helper: Random Number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper: Calculate Delay
function getDelay() {
  return Math.max(1, 400 - speed);
}

// Generate Array
function generateNewArray() {
  stopSorting();

  barsCon.innerHTML = '';
  bars = [];
  barsHeight = [];
  c = 0;

  const containerWidth = barsCon.clientWidth;
  const barWidth = Math.max(2, Math.floor(containerWidth / n) - 4);
  document.documentElement.style.setProperty('--bar-width', `${barWidth}px`);

  for (let i = 0; i < n; i++) {
    barsHeight[i] = randomNumber(50, 500);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${barsHeight[i]}px`;
    barsCon.appendChild(bar);
    bars.push(bar);
  }

  // Reset info
  document.getElementById('cycle').innerHTML = 'Cycle: 0';
}

// Stop Sorting
function stopSorting() {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
  c = 0;

  sortBtn.innerHTML = "Sort!";
  enableControls();

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = PRIMARY_COLOR;
  }
}

// Animation function
const anim = (bar, height, color) => {
  const currentDelay = getDelay();
  const tId = setTimeout(() => {
    bar.style.height = `${height}px`;
    bar.style.backgroundColor = color;
  }, c += (currentDelay));
  timeouts.push(tId);
};

// Cycle Update Helper
const updateCycle = (val) => {
  // Current accumulated delay `c` is the time when this cycle starts (approximately)
  // We want the text update to happen at that time.
  const tId = setTimeout(() => {
    const cycle = document.getElementById('cycle');
    if (cycle) cycle.innerHTML = `Cycle: ${val}`;
  }, c); // Use the current 'c' which represents the timeline
  timeouts.push(tId);
};

// Controls Handling
function disableControls() {
  arrayRange.disabled = true;
  speedRange.disabled = true;
  newArrayBtn.disabled = true;
  algoSelect.disabled = true;
  newArrayBtn.classList.add('disabled');
}

function enableControls() {
  arrayRange.disabled = false;
  speedRange.disabled = false;
  newArrayBtn.disabled = false;
  sortBtn.disabled = false;
  algoSelect.disabled = false;
  newArrayBtn.classList.remove('disabled');
}

// Event Listeners
arrayRange.addEventListener('input', (e) => {
  n = parseInt(e.target.value);
  generateNewArray();
});

speedRange.addEventListener('input', (e) => {
  speed = parseInt(e.target.value);
});

newArrayBtn.addEventListener('click', generateNewArray);

algoSelect.addEventListener('change', (e) => {
  curAlgo = e.target.value;
});

sortBtn.addEventListener('click', () => {
  if (sortBtn.innerHTML === "Stop") {
    stopSorting();
    return;
  }

  sortBtn.innerHTML = "Stop";
  disableControls();
  c = 0;
  timeouts = [];

  const div = document.getElementById('info');
  // Note: We are not overwriting 'cycle' anymore because it's a sibling in DOM now

  switch (curAlgo) {
    case 'Bubble Sort':
      div.innerHTML = "Bubble Sort<br> Time Complexity: O(n^2)<br> Space Complexity: O(1)";
      bubbleSort();
      break;
    case 'Selection Sort':
      div.innerHTML = "Selection Sort<br> Time Complexity: O(n^2)<br> Space Complexity: O(1)";
      selectionSort();
      break;
    case 'Insertion Sort':
      div.innerHTML = "Insertion Sort<br> Time Complexity: O(n^2)<br> Space Complexity: O(1)";
      insertionSort();
      break;
    default:
      bubbleSort();
  }

  // Finalize sorted state
  const tId1 = setTimeout(() => {
    for (let i = 0; i < n; i++) {
      const innerTId = setTimeout(() => {
        bars[i].style.backgroundColor = SORTED_COLOR;
      }, i * 10);
      timeouts.push(innerTId);
    }
    // Final update for cycle?
    if (document.getElementById('cycle')) document.getElementById('cycle').innerHTML = "Sorted!";
  }, c);
  timeouts.push(tId1);

  const tId2 = setTimeout(() => {
    sortBtn.innerHTML = "Sort!";
    enableControls();
    timeouts = [];
  }, c + (n * 10) + 500);
  timeouts.push(tId2);
});

// Algorithms
function bubbleSort() {
  updateCycle(0);
  for (let i = 0; i < n - 1; i++) {
    updateCycle(i); // Update UI asynchronously

    for (let j = 0; j < n - i - 1; j++) {
      anim(bars[j], barsHeight[j], COMPARE_COLOR);
      anim(bars[j + 1], barsHeight[j + 1], COMPARE_COLOR);

      if (barsHeight[j] > barsHeight[j + 1]) {
        [barsHeight[j], barsHeight[j + 1]] = [barsHeight[j + 1], barsHeight[j]];

        anim(bars[j], barsHeight[j], SWAP_COLOR);
        anim(bars[j + 1], barsHeight[j + 1], SWAP_COLOR);
      }

      anim(bars[j], barsHeight[j], PRIMARY_COLOR);
      anim(bars[j + 1], barsHeight[j + 1], PRIMARY_COLOR);
    }
    anim(bars[n - 1 - i], barsHeight[n - 1 - i], SORTED_COLOR);
  }
  anim(bars[0], barsHeight[0], SORTED_COLOR);
}

function selectionSort() {
  for (let i = 0; i < n - 1; i++) {
    updateCycle(i);
    let min = i;

    for (let j = i + 1; j < n; j++) {
      anim(bars[j], barsHeight[j], COMPARE_COLOR);
      anim(bars[min], barsHeight[min], COMPARE_COLOR);

      if (barsHeight[j] < barsHeight[min]) {
        if (min !== i) {
          anim(bars[min], barsHeight[min], PRIMARY_COLOR);
        }
        min = j;
      } else {
        anim(bars[j], barsHeight[j], PRIMARY_COLOR);
      }
    }

    if (min !== i) {
      [barsHeight[i], barsHeight[min]] = [barsHeight[min], barsHeight[i]];
      anim(bars[i], barsHeight[i], SWAP_COLOR);
      anim(bars[min], barsHeight[min], SWAP_COLOR);

      anim(bars[min], barsHeight[min], PRIMARY_COLOR);
    }

    anim(bars[i], barsHeight[i], SORTED_COLOR);
  }
  anim(bars[n - 1], barsHeight[n - 1], SORTED_COLOR);
}

function insertionSort() {
  for (let i = 1; i < n; i++) {
    updateCycle(i);
    let key = barsHeight[i];
    let j = i - 1;

    anim(bars[i], barsHeight[i], COMPARE_COLOR);

    while (j >= 0 && barsHeight[j] > key) {
      barsHeight[j + 1] = barsHeight[j];

      anim(bars[j], barsHeight[j], COMPARE_COLOR);
      anim(bars[j + 1], barsHeight[j + 1], SWAP_COLOR);

      anim(bars[j], barsHeight[j], PRIMARY_COLOR);

      j = j - 1;
    }
    barsHeight[j + 1] = key;
    anim(bars[j + 1], barsHeight[j + 1], SORTED_COLOR);
    anim(bars[j + 1], barsHeight[j + 1], PRIMARY_COLOR);
  }
}

// Initial Load
window.addEventListener('load', () => {
  generateNewArray();
  window.addEventListener('resize', generateNewArray);
});