// GOAL  add two always-present buttons below the countdown in the timer
// One button will say Start when the timer is stopped, and Pause when it’s running. Clicking it starts or stops the timer without resetting the time.
// The second, Restart, will reset the time to its original value and start the timer over again.

// STEPS
// Button needs twos states: stopped and running
// If stopped innerHTML === 'pause' and click stops timer
// If running innerHTML === 'start' and click starts timer

// Button 1: In template (or helper function - button in HTML?):
// if data.time > 0 < duration (its running) innerHTML is pause
// if data.time === duration (its not running) so innerHTML is start
// on click, pause timer
// pausetimer(), if timer, then clear timer, else add timer?
//

// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const duration = 120;
  const interval = 100;
  let timer;

  /* ==========  Constructor  ========== */
  const Timer = function (selector, options) {
    this.element = document.querySelector(selector);
    this.data = options.data;
    this.template = options.template;
  };

  Timer.prototype.render = function () {
    this.element.innerHTML = this.template(this.data);
  };

  /* ==========  Functions  ========== */

  function getTimerHTML(props) {
    const mins = parseInt(props.time / 60);
    const secs = props.time % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function stopTimer() {
    if (app.data.time > 0) return;
    clearInterval(timer);
  }

  function countDown() {
    app.data.time--;
    stopTimer();
    app.render();
  }

  function startTimer() {
    app.data.time = duration;
    app.render();
    timer = setInterval(countDown, interval);
  }

  function clickHandler(event) {
    if (!event.target.hasAttribute('data-restart-timer')) return;
    startTimer();
  }

  function pauseTimer(props) {
    console.log(props.time, duration);
    if (props.time > 0) {
      return 'Pause';
    }
    return 'Start';
  }

  /* ==========  Instance  ========== */
  const app = new Timer('#app', {
    data: {
      time: duration,
    },
    template(props) {
      return `<p>${getTimerHTML(props)}</p>
      <button class="numbers" data-restart-timer>Restart Timer</button>
      <button class="numbers" data-pause-timer>${pauseTimer(props)}</button>`;
    },
  });

  /* ==========  Inits and Event listeners  ========== */

  startTimer();
  document.addEventListener('click', clickHandler);
})();
