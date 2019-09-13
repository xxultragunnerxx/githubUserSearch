const apiKey = "";

function formatQueryParams(userObject) {
  const items = Object.keys(userObject).map(key => `${key}=${userObject[key]}`)
  return items.join("&");
}

function main() {
  $(`fieldset`).on("click", "#submit", function () {
    event.preventDefault();
    let userQuery = $('#text-box').val();
    getUserName(userQuery);
  });
}

function getUserName(username) {
  const searchUrl = `https://api.github.com/users/${username}/repos`;

  fetch(searchUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

const displayResults = (responseJson) => {
    $('.search-results').empty();
  responseJson.forEach((repoObj) => {
    $('.search-results').append(`
          <li><a href="${repoObj.html_url}">${repoObj.name}</a></li>
       `)
  })

}


$(main);
