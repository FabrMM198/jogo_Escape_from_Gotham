const batman = document.querySelector('.batman');
const bane = document.querySelector('.bane');
const gameBoard = document.querySelector('.game-board');
const startMessage = document.querySelector('.start-message');
const gameOverImage = document.querySelector('.game-over');
let gameStarted = false;
let gameOver = false;

const getHitbox = (element, bounds) => {
    const rect = element.getBoundingClientRect();

    return {
        left: rect.left + rect.width * bounds.left,
        right: rect.left + rect.width * bounds.right,
        top: rect.top + rect.height * bounds.top,
        bottom: rect.top + rect.height * bounds.bottom,
    };
};

const jump = () => {
    if (!gameStarted || gameOver || batman.classList.contains('jump')) {
        return;
    }

    batman.classList.add('jump');
};

const startGame = () => {
    gameStarted = false;
    gameOver = false;
    startMessage.hidden = true;
    gameOverImage.hidden = true;
    batman.classList.remove('jump');

    bane.style.animation = 'none';
    bane.style.right = '-80px';
    bane.offsetWidth;
    bane.style.right = '';
    bane.style.animation = '';
    bane.style.animationPlayState = 'running';
    gameStarted = true;
};

batman.addEventListener('animationend', () => {
    batman.classList.remove('jump');
});

gameBoard.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) {
        return;
    }

    if (!gameStarted) {
        startGame();
        return;
    }

    jump();
});

const loop = setInterval(() => {
    if (!gameStarted) {
        return;
    }

    const batmanRect = getHitbox(batman, {
        left: 56 / 480,
        right: 422 / 480,
        top: 53 / 480,
        bottom: 401 / 480,
    });
    const baneRect = getHitbox(bane, {
        left: 0,
        right: 1,
        top: 11 / 508,
        bottom: 496 / 508,
    });
    const collided =
        batmanRect.left < baneRect.right &&
        batmanRect.right > baneRect.left &&
        batmanRect.top < baneRect.bottom &&
        batmanRect.bottom > baneRect.top;

    if (collided) {
        gameStarted = false;
        gameOver = true;
        bane.style.animationPlayState = 'paused';
        batman.classList.remove('jump');
        gameOverImage.hidden = false;
        startMessage.textContent = 'Aperte B ou toque para reiniciar';
        startMessage.hidden = false;
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyB') {
        startGame();
        return;
    }

    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});