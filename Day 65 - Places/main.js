// avoid global scope
(function () {

  const endpoint = 'https://vanillajsacademy.com/api/places.json';

  const app = new Reef('#app', {
    data: {},
    template: function (props) {
      if (Object.keys(props).length < 1) return;
      return props.posts
        .map(function (prop) {
          return `
        <h2><a href="${prop.url}">${prop.place}</a></h2>
        <img src="${prop.img}" alt="" width="640" height="427">
        <p>${prop.description}</p>
        <p><address>${prop.location}</address></p>`;
        })
        .join(' ');
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
