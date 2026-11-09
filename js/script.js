const batman = document.querySelector('.batman');
const bane = document.querySelector('.bane');
const gameOverImage = document.querySelector('.game-over');
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
    if (gameOver || batman.classList.contains('jump')) {
        return;
    }

    batman.classList.add('jump');
};

batman.addEventListener('animationend', () => {
    batman.classList.remove('jump');
});

const loop = setInterval(() => {
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
        gameOver = true;
        bane.style.animationPlayState = 'paused';
        batman.classList.remove('jump');
        gameOverImage.hidden = false;
        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        jump();
    }
});