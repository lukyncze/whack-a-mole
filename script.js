const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const gameDuration = 10000;
let lastHole,
  gameInProgress,
  score = 0;

const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randomHole = holes => {
  const number = Math.floor(Math.random() * holes.length);
  const hole = holes[number];

  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;

  return hole;
};

const popUpMole = () => {
  const timeToPop = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (gameInProgress) popUpMole();
  }, timeToPop);
};

const loadGame = () => {
  scoreBoard.textContent = 0;
  score = 0;
  gameInProgress = true;
  popUpMole();

  setTimeout(() => (gameInProgress = false), gameDuration);
};

const startGame = () => {
  if (gameInProgress) return;
  loadGame();
};

function moleHit(e) {
  // "Anti-cheat against players who likes to simulate their clicks"
  if (!e.isTrusted) return;
  this.parentNode.classList.remove('up');
  score++;
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', moleHit));
