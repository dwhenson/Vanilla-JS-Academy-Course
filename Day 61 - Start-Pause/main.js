// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const duration = 120;
  const interval = 1000;
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
    const html = `${mins.toString()}:${secs.toString().padStart(2, '0')}
    <p>
    ${
      props.paused
        ? `<button data-start-timer>Start</button>`
        : `<button data-pause-timer>Pause</button>`
    }
    </p>
    <button class="numbers" data-restart-timer>Restart</button>`;
    return html;
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function countDown() {
    app.data.time--;
    if (app.data.time < 1) {
      stopTimer();
    }
    app.render();
  }

  function startTimer(event) {
    if (!event.target.hasAttribute('data-start-timer')) return;

    if (app.data.time < 1) {
      restartTimer();
      return;
    }
    app.data.paused = false;
    app.render();
    stopTimer();
    timer = setInterval(countDown, interval);
  }

  function pauseTimer(event) {
    if (!event.target.hasAttribute('data-pause-timer')) return;
    stopTimer();
    app.data.paused = true;
    app.render();
  }

  function restartTimer(event) {
    if (!event.target.hasAttribute('data-restart-timer')) return;
    stopTimer();
    app.data.time = duration;
    app.data.paused = false;
    app.render();
    timer = setInterval(countDown, interval);
  }

  function clickHandler(event) {
    startTimer(event);
    pauseTimer(event);
    restartTimer(event);
  }

  /* ==========  Instance  ========== */
  const app = new Timer('#app', {
    data: {
      time: duration,
      paused: true,
    },
    template(props) {
      if (props.time < 1) {
        return '⏰ <p><button data-restart-timer>Restart Timer</button></p>';
      }
      return getTimerHTML(props);
    },
  });

  /* ==========  Inits and Event listeners  ========== */

  app.render();
  document.addEventListener('click', clickHandler);
})();
