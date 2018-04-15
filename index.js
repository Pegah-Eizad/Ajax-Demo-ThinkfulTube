const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: `AIzaSyAKFCsbsJ-lR3nhd4OMAyGh2YOO2KVtAC0`,
    q: `${searchTerm}`,
    maxResults: 5
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
      <h2><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a></h2>
    </div>
    `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);

