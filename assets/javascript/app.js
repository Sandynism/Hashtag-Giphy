let apiKey = "ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU"

let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=" + apiKey + "&limit=5"
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons&api_key=ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU&limit=5"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
})

// "embed_url" = direct giphy link
// "rating" = ratings // is it response.data[i].rating