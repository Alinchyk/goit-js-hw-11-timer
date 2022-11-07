import "normalize.css";
import "./styles/main.scss";

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const startTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      updateClockface(time);

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        const time = this.getTimeComponents(0);
        updateClockface(time);
      }
    }, 1000);
  }

  getTimeComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("May 17, 2023"),
});

timer.start();

function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;

  return `${days}:${hours}:${mins}:${secs}`;
}
