const batman = document.querySelector('.batman');

const jump = () => {
    if (batman.classList.contains('jump')) {
        return;
    }

    batman.classList.add('jump');
}

batman.addEventListener('animationend', () => {
    batman.classList.remove('jump');
});

document.addEventListener('keydown', jump); 