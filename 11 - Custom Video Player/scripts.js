const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let mouseDown = false;

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    console.info(method);
};

function updatePlayStatus() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
};

function skip() {
    const currTime = video.currentTime;
    const skip = this.dataset.skip;
    const rewinding = skip.indexOf('-') >= 0;
    if (currTime === 0 && rewinding) {
        console.info(`Already at ${currTime}`);
        return;
    }
    if (currTime < 10 && rewinding) {
        console.info('Skipping to start');
        return;
    }
    video.currentTime += +skip;
    console.info(`Skipping ${skip} seconds from ${currTime} to ${video.currentTime}`);
};

function handleRangeSlider() {
    video[this.name] = this.value;
    console.log(this.name, this.value);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
};

function handleScrub(event) {
    video.currentTime = (event.offsetX / progress.offsetWidth) * video.duration;
};

function handleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

video.addEventListener('play', updatePlayStatus);
video.addEventListener('pause', updatePlayStatus);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
    range.addEventListener('change', handleRangeSlider)
    range.addEventListener('mousemove', handleRangeSlider)
});
progress.addEventListener('click', handleScrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', event => mouseDown && handleScrub(event));
fullscreen.addEventListener('click', handleFullScreen);
