// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const duration = 120;
  const interval = 1000;
  let timer;
  let state = 1;
  let action = 'Start';

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
    clearTimeout(timer);
    app.data.time = duration;
    app.render();
    timer = setInterval(countDown, interval);
  }

  function pauseTimer() {
    if (app.data.time === duration) {
      startTimer();
      action = 'Pause';
      return;
    }
    if (state === 1) {
      state = 0;
      action = 'Start';
      clearInterval(timer);
      app.render();
      return;
    }
    if (state === 0) {
      state = 1;
      action = 'Pause';
      timer = setInterval(countDown, interval);
      app.render();
    }
  }

  function clickHandler(event) {
    if (event.target.hasAttribute('data-restart-timer')) {
      startTimer();
    }
    if (event.target.hasAttribute('data-pause-timer')) {
      pauseTimer();
    }
  }

  /* ==========  Instance  ========== */
  const app = new Timer('#app', {
    data: {
      time: duration,
    },
    template(props) {
      return `<p>${getTimerHTML(props)}</p>
      <button class="numbers" data-restart-timer>Restart</button>
      <button class="numbers" data-pause-timer>${action}</button>`;
    },
  });


  /* ==========  Inits and Event listeners  ========== */

  app.render();
  document.addEventListener('click', clickHandler);
})();


