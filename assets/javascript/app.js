let famousPeeps = ["bob ross", "yoda", "jimmy fallon", "avengers", "armin van buuren", "miyazaki", "tina fey", "chandler bing", "barack obama", "beyonce",]

// empties the giphys & buttons div 
function renderButtons() {
    $("#giphys-buttons").empty()
    $("#giphys").empty()

    // creates a button for famousPeeps array
    for (let i = 0; i < famousPeeps.length; i++) {
        let button = $("<button>")
        button.html(famousPeeps[i])
        button.addClass("btn btn-warning")
        button.attr("id", "person-btn")
        button.attr("name", famousPeeps[i])
        $("#giphys-buttons").append(button)
    }
}

function displayGifs() {
    renderButtons()
    let searchParam = $(this).attr("name")
    console.log(searchParam)

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU" + "&limit=8"
    // let queryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons&api_key=ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU&limit=5"

    // ajax call to giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)

        // creates a still image gif 
        for (let i = 0; i < response.data.length; i++) {
            let giphyDiv = $("<div>")
            giphyDiv.addClass("giphyDiv")
            //adds rating for gif
            let rating = response.data[i].rating
            let p = $("<p>").html("Rated: " + rating)
            p.addClass("text-center")

            let gif = $("<img>")
            gif.addClass("gif")
            gif.attr("src", response.data[i].images.fixed_height_still.url)
            gif.attr("data-still", response.data[i].images.fixed_height_still.url)
            gif.attr("data-animate", response.data[i].images.fixed_height.url)
            gif.attr("data-state", "still")

            giphyDiv.append(p)
            giphyDiv.prepend(gif)

            // places the giphyDiv at the top of the giphys div
            $("#giphys").prepend(giphyDiv)
        }
    }) 
}
//response.data[i].images.fixed_height.mp4 to download gif

// on submit, the userInput value is pushed into the famousPeeps array & previous array is cleared
$("#submit-btn").on("click", function (event) {
    event.preventDefault()

    let newPeep = $("#userInput").val().trim()
    famousPeeps.push(newPeep)
    renderButtons()
})

// displayGifs function reacts to #person-btn on click
$(document).on("click", "#person-btn", displayGifs)

// plays and pauses gif animation
$(document).on("click", ".gif", function () {
    let current = $(this).attr("data-state")

    if (current === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})

renderButtons()



