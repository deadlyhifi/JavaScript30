let countDown;
const timeDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// set initial
timer(0);
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const time = this.minutes.value;
  if (time <= 0 || isNaN(time)) {
    this.reset();
  }
  timer(this.minutes.value * 60);
  this.reset();
});

function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndtime(then);

  setInterval(() => {
    const remaining = Math.round((then - Date.now()) / 1000);

    if (remaining < 0) {
      clearInterval(countDown);
      return;
    }

    displayTimeLeft(remaining);
  }, 1000);
}

function displayTimeLeft(remaining) {
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${leadigZero(mins)}:${leadigZero(secs)}`;
  document.title = display;
  timeDisplay.textContent = display;
}

function displayEndtime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const mins = end.getMinutes();

  endTimeDisplay.textContent = `Back at: ${leadigZero(hours)}:${leadigZero(mins)}`;
}

function startTimer() {
  timer(+this.dataset.time);
}

function leadigZero(number) {
  return (number < 10 ? '0' : '') + number;
}
