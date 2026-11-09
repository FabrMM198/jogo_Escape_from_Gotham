const batman = document.querySelector('.batman');
const bane = document.querySelector('.bane');
let gameOver = false;

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
    const batmanRect = batman.getBoundingClientRect();
    const baneRect = bane.getBoundingClientRect();
    const collided =
        batmanRect.left < baneRect.right &&
        batmanRect.right > baneRect.left &&
        batmanRect.top < baneRect.bottom &&
        batmanRect.bottom > baneRect.top;

    if (collided) {
        gameOver = true;
        bane.style.animationPlayState = 'paused';
        batman.classList.remove('jump');
        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);