// avoid global scope
(function () {
  const favesID = 'favedPlaces';
  /**
   * Create the HTML for each place retrieved from API
   * @param  {object} props The app data
   * @return {string}       The HTML
   */
  function renderHTML(props) {
    return props.posts
      .map(function (place) {
        return `
             <h2>
             <button data-fave="${place.id}" aria-label ="save ${place.place}" aria-pressed="${props.faves[place.id]}">&hearts;</button>
             <a href="${place.url}">${place.place}</a>
             </h2>
             <img src="${place.img}" alt="" width="640" height="427">
             <p>${place.description}</p>
             <address><p>${place.location}</p></address>`;
      })
      .join(' ');
  }

  /**
   * Create the HTML to render if API fails
   * @return {string} The HTML
   */
  function renderHTMLFail() {
    return `<p>Sorry something went wrong</p>`;
  }

  function getFaves() {
    const faves = localStorage.getItem(favesID);
    const favesObj = faves ? JSON.parse(faves) : {};
    return favesObj;
  }

  function saveFaves(faves) {
    localStorage.setItem(favesID, JSON.stringify(faves));
  }

  function renderHandler(event) {
    saveFaves(app.data.faves);
  }

  /**
   * get the data from the API and update the app state
   */
  function fetchPlaces() {
    fetch('https://vanillajsacademy.com/api/places.json')
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => {
        app.data.posts = data;
        app.data.faves = getFaves();
      })
      .catch((error) => {
        console.warn(error);
        app.data.posts = null;
      });
  }

  /**
   * The app component
   */
  const app = new Reef('#app', {
    data: {},
    template(props) {
      if (props.posts) {
        return renderHTML(props);
      }
      return renderHTMLFail();
    },
  });

  function clickHandler(event) {
    const place = event.target.getAttribute('data-fave');
    if (!place) return;
    app.data.faves[place] = app.data.faves[place] ? false : true;
  }

  /* ==========  Inits and Listeners  ========== */

  fetchPlaces();
  document.addEventListener('click', clickHandler);
  document.addEventListener('render', renderHandler);
})();
