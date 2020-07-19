// GOAL:
// Add a “Visited” button for users to mark off locations they’ve already been to. Visited locations should be saved between visits.
// When the user selects one of the filters, change the UI to only show locations that match the filter criteria
//
// STEPS:



// avoid global scope
(function () {
  const endpoint = 'https://vanillajsacademy.com/api/places.json';
  const favesID = 'favorites';

  function getFaves() {
    const faves = localStorage.getItem(favesID);
    const favesObj = faves ? JSON.parse(faves) : {};
    return favesObj;
  }

  function saveFaves(faves) {
    localStorage.setItem(favesID, JSON.stringify(faves));
  }

  function getPlaces() {
    fetch(endpoint)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => {
        app.data.faves = getFaves();
        app.data.posts = data;
      })
      .catch((error) => {
        console.warn(error);
        app.data.posts = null;
      });
  }

  function getPlacesHTML(props) {
    return props.posts
      .map(function (prop) {
        return `
        <h2>
        <button data-fave="${prop.id}" aria-label="Save ${prop.place}" aria-pressed="${props.faves[prop.id]}">❤</button>
        <a href="${prop.url}">${prop.place}</a>
        </h2>
        <img src="${prop.img}" alt="" width="640" height="427">
        <p>${prop.description}</p>
        <address><p>${prop.location}</p></address>`;
      })
      .join('');
  }

  function getPlacesFailHTML() {
    return `<p><em>Unable to find any places right now. Please try again later. Sorry!</em></p>`;
  }

  const app = new Reef('#app', {
    data: {},
    template(props) {
      if (props.posts && props.posts.length) {
        return getPlacesHTML(props);
      }
      return getPlacesFailHTML();
    },
  });

  function clickHandler(event) {
    const place = event.target.getAttribute('data-fave');
    if (!place) return;
    app.data.faves[place] = app.data.faves[place] ? false : true;
  }

  function renderHandler(event) {
    saveFaves(app.data.faves);
  }

  getPlaces();
  document.addEventListener('render', renderHandler);
  document.addEventListener('click', clickHandler);
})();

