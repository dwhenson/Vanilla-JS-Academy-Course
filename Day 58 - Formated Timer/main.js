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
    const mins = parseInt(props.time / 60)
      .toString()
      .padStart(2, '0');
    const secs = props.time % (60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
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

  /* ==========  Instance  ========== */
  const app = new Timer('#app', {
    data: {
      time: duration,
    },
    template(props) {
      if (props.time < 1) {
        return ` <div class ="clock">⏰</div>
                  <button class="numbers" data-restart-timer>Restart Timer
                  </button>`;
      }
      return getTimerHTML(props);
    },
  });

  /* ==========  Inits and Event listeners  ========== */

  startTimer();
  document.addEventListener('click', clickHandler);
})();
