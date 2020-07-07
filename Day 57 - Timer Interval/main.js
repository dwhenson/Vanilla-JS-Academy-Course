// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const duration = 60;
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

  /* ==========  Instance  ========== */
  const app = new Timer('#app', {
    data: {
      time: duration,
    },
    template: function (data) {
      if (data.time < 1) {
        return ` <div class ="clock">⏰</div><p><button data-restart-timer>Restart Timer</button></p>`;
      }
      return data.time;
    },
  }); 

  /* ==========  Functions  ========== */

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

  /* ==========  Inits and Event listeners  ========== */

  startTimer();
  document.addEventListener('click', clickHandler);
})();
