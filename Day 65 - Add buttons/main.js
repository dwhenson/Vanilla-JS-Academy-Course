// avoid global scope
(function () {
  const endpoint = 'https://vanillajsacademy.com/api/places.json';

  function getPlaces() {
    fetch(endpoint)
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((data) => {
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
        <h2><a href="${prop.url}">${prop.place}</a></h2>
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
    template (props) {
      if (props.posts && props.posts.length) {
        return getPlacesHTML(props);
      }
      return getPlacesFailHTML();
    },
  });

  getPlaces();
})();
