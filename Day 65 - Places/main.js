// GOAL: Get location data from the API, and display the places from the API in the #app element using state-based UI.
// STEPS:
// Set up new component (do not call render)
// Make API call, convert to JSON, set app state to returned data
// Should reactively call fresh render

// avoid global scope
// avoid global scope
(function () {
  /* ==========  Variables  ========== */

  const endpoint = 'https://vanillajsacademy.com/api/places.json';

  const app = new Reef('#app', {
    data: {},
    template: function (props) {
      if (Object.keys(props).length < 1) return;
      console.log(props);
      return props.posts.map(function (prop) {
        return `
        <h2><a href="${prop.url}">${prop.place}</a></h2>
        <img src="${prop.img}" alt="" width="640" height="427">
        <p>${prop.description}</p>
        <p><i>${prop.location}</i></p>
        `;
      }).join(' ');
    },
  });

  app.render();

  fetch(endpoint)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .then((data) => {
      app.data.posts = data;
    })
    .catch((error) => {
      console.warn(error);
    });
})();

