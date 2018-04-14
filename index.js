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
  /*
  return `
    <div>
    
      <h2>
      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
      
    </div>
  `;
  */
  return `
    <div>
      <a class="js-result-name" href="https://www.google.com/" target="_blank" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
      <h2><a href="#" target="_blank">${result.snippet.title}</a></h2>
    </div>
    `;
}

function displayYouTubeSearchData(data) {
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

