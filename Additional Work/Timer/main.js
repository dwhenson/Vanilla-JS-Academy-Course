// avoid global scope
(function () {
  /* ==========  Variables  ========== */
  const duration = 120;
  const interval = 1000;
  let timer;

  /* ==========  Constructor  ========== */

  function handler(instance) {
    return {
      get(obj, prop) {
        if (
          ['[object Object]', '[object Array]'].indexOf(
            Object.prototype.toString.call(obj[prop])
          ) > -1
        ) {
          return new Proxy(obj[prop], handler(instance));
        }
        return obj[prop];
        instance.render();
      },
      set(obj, prop, value) {
        obj[prop] = value;
        instance.render();
        return true;
      },
      deleteProperty(obj, prop) {
        delete obj[prop];
        instance.render();
        return true;
      },
    };
  }

  const Timer = function (selector, options) {
    this.elem = document.querySelector(selector);
    let _data = new Proxy(options.data, handler(this));
    this.template = options.template;

    Object.defineProperty(this, 'data', {
      get() {
        return _data;
      },
      set(data) {
        _data = new Proxy(data, handler(_this));
        _this.render();
        return true;
      },
    });
  };

  Timer.prototype.render = function () {
    this.elem.innerHTML = this.template(this.data);
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
  }

  function startTimer(event) {
    if (!event.target.hasAttribute('data-start-timer')) return;

    if (app.data.time < 1) {
      restartTimer();
      return;
    }
    app.data.paused = false;
    stopTimer();
    timer = setInterval(countDown, interval);
  }

  function pauseTimer(event) {
    if (!event.target.hasAttribute('data-pause-timer')) return;
    stopTimer();
    app.data.paused = true;
  }

  function restartTimer(event) {
    if (!event.target.hasAttribute('data-restart-timer')) return;
    stopTimer();
    app.data.time = duration;
    app.data.paused = false;
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
