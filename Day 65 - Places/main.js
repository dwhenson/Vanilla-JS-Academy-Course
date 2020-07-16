// GOAL: For each place, add a “favorite” button. Give the button a different appearance when the place is “favorited” versus when it’s not. When the user revisits the page, their favorites should reload.
//
// STEPS
// Create a function to change the attribute to true/false
// Set value to local storage?
//

// avoid global scope
(function () {
  const endpoint = 'https://vanillajsacademy.com/api/places.json';
  const prefix = 'favorites'

  function getPlaces() {
    fetch(endpoint)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((data) => {
        app.data.posts = data;
      })
      .catch((error) => {
        console.warn(error);
        app.data.posts = null;
      });
  }

  function saveStorage(event) {
    let saved = localStorage.getItem(prefix);
    saved = saved ? JSON.parse(saved) : {};
    saved[event.target.id] = event.target.id;
    localStorage.setItem(prefix, JSON.stringify(saved));
  }


  function renderButton(event) {
    if (!event.target.hasAttribute('aria-pressed')) return;
    event.target.getAttribute('aria-pressed') === 'true'
      ? event.target.setAttribute('aria-pressed', 'false')
      : event.target.setAttribute('aria-pressed', 'true')
    saveStorage(event)
  }

  function getPlacesHTML(props) {
    return props.posts
      .map(function (prop) {
        return `
        <h2>
        <button id="${prop.id}" aria-label="Favorite" aria-pressed="false">❤</button>
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

  getPlaces();
  document.addEventListener('click', renderButton);
})();


