const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const gameDuration = 10000;

let lastHole;
let score = 0;
let timeUp = false;

// Function that returns a random time
const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

// Function that returns a random hole
const randomHole = holes => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
};

// Function for popping up moles
const popUpMole = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) popUpMole();
  }, time);
};

// When user click the button -> start the game
const startGame = () => {
  // User can start only one game (Fixed bug)
  let timestamp = +new Date();
  if (this.timestamp && timestamp - this.timestamp < gameDuration) return;
  this.timestamp = timestamp;

  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  popUpMole();
  setTimeout(() => (timeUp = true), gameDuration);
};

// Function that calls after user whacks a mole
const moleHit = e => {
  // "Anti-cheat against players who likes to simulate their clicks"
  if (!e.isTrusted) return;

  this.parentNode.classList.remove('up');
  score++;
  scoreBoard.textContent = score;
};

// Event listeners on whack a mole
moles.forEach(mole => mole.addEventListener('click', moleHit));
