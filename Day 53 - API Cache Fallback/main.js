// GOAL
// If there’s data in localStorage, and it hasn’t expired, use it.
// Otherwise, call the API to get fresh data.
// If the API fails and there’s expired data in localStorage, use that instead.
//
// Variables
//

// Get the #app element
const app = document.querySelector('#app');

// Define a localStorage ID
const storageID = 'pirateCache';

//
// Methods
//

/**
 * Dynamically vary the API endpoint
 * @return {String} The API endpoint
 */
const getEndpoint = function () {
  const endpoint = 'https://vanillajsacademy.com/api/';
  const random = Math.random();
  if (random < 0.5) return `${endpoint}pirates.json`;
  return `${endpoint}fail.json`;
};

/**
 * Sanitize and encode all HTML in a user-submitted string
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
const sanitizeHTML = function (str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Render a message into the UI when there are no articles to share
 */
const renderNoArticles = function () {
  app.innerHTML =
    '<p>There be no pirate news afoot, matey. Check back later.</p>';
};

/**
 * Render articles into the UI
 * @param  {Object} data The API response object
 */
const renderNews = function (data) {
  // If there are no articles, render a message into the UI
  if (data.articles.length < 1) {
    renderNoArticles();
    return;
  }

  // Otherwise, render the UI
  app.innerHTML = `${data.articles
    .map(function (article) {
      const html =
        `${'<article>' + '<h2>'}${sanitizeHTML(article.title)}</h2>` +
        `<p><em>By ${sanitizeHTML(article.author)} on ${sanitizeHTML(
          article.pubdate
        )}</em></p>${sanitizeHTML(article.article)}</article>`;
      return html;
    })
    .join('')}<p><em>Articles from <a href="${sanitizeHTML(
    data.attribution.url
  )}">${sanitizeHTML(data.attribution.name)}</a></em></p>`;
};

/**
 * Check if the data is valid
 * @param  {Object}  saved   The data to validate
 * @param  {Number}  goodFor How long the data is good for
 * @return {Boolean}         If true, data has not yet expired
 */
const isDataValid = function (saved, goodFor) {
  // Check that there's data, and a timestamp key
  if (!saved || !saved.data || !saved.timestamp) return false;

  // Get the difference between the timestamp and current time
  const difference = new Date().getTime() - saved.timestamp;

  return difference < goodFor;
};

/**
 * Save article data to localStorage
 * @param  {Object} data The article data
 */
const saveData = function (data) {
  // Create a cache object with a timestamp
  const cache = {
    data,
    timestamp: new Date().getTime(),
  };

  // Stringify it and save it to localStorage
  localStorage.setItem(storageID, JSON.stringify(cache));
};

/**
 * Get API data from localStorage
 */
const getData = function () {
  // Get saved data from localStorage
  let saved = localStorage.getItem(storageID);
  if (!saved) return;
  saved = JSON.parse(saved);

  // If data is has not expired, return it
  // Use cached data from 30 seconds
  if (isDataValid(saved, 1000 * 5)) {
    return saved.data;
  }
};

/**
 * Call renderNews to render with localStorage data and flag issue
 * @param  {Object} data The object from local storage
 */
function renderStoredNews(data) {
  console.log('API failed, data from local storage');
  renderNews(data);
  app.innerHTML += `
    <small>There was a problem updating the news. This news is from stored data</small>`;
}

/**
 * Handle errors if the API fails
 */
const handleErrors = function () {
  const saved = JSON.parse(localStorage.getItem(storageID));
  if (saved) {
    renderStoredNews(saved.data);
  } else {
    renderNoArticles();
  }
};

/**
 * Get articles from the cache if still valid, or from the API if not
 */
const fetchArticles = function () {
  // Check for valid cached data
  // If it exists, use it
  const saved = getData();
  if (saved) {
    renderNews(saved);
    console.log('Loaded from cache');
    return;
  }

  // Otherwise, fetch articles from the API
  fetch(getEndpoint())
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      renderNews(data);
      saveData(data);
      console.log('Fetched from API');
    })
    .catch(function () {
      handleErrors();
    });
};

//
// Inits
//

fetchArticles();
