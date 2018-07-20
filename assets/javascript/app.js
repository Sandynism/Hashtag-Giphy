//topics
let famousPeeps = ["bob ross", "yoda", "jimmy fallon", "avengers", "armin van buuren", "miyazaki", "tina fey", "chandler bing", "barack obama", "beyonce"]

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

    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU" + "&limit=10"
    // let testerqueryURL = "https://api.giphy.com/v1/gifs/search?q=simpsons&api_key=ha6q5j8JlwlgQ0fuy8PzOQ8A5hsYI8wU&limit=5"

    // ajax call to giphy
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response)
        let item = response.data

        // creates a still image gif 
        for (let i = 0; i < item.length; i++) {
            let giphyDiv = $("<div>")
            giphyDiv.addClass("giphyDiv")
            //adds rating for gif
            let rating = item[i].rating
            let p = $("<p>").html("Rated: " + rating)
            p.addClass("text-center")

            let stillImg = item[i].images.fixed_height_still.url
            let animatedImg = item[i].images.fixed_height.url
            
            let gif = $("<img>")
            gif.addClass("gif")
            gif.attr("src", stillImg)
            gif.attr("data-still", stillImg)
            gif.attr("data-animate", animatedImg)
            gif.attr("data-state", "still")

            // let dlBtn = ("<button>")
            // dlBtn.attr("href", still)
            // dlBtn.download = 
            // gif.attr("href", response.data[i].images.fixed_height_still.url)
            // gif.attr("download", true)
            // let a = $("<a>")
            // a.attr("href", gif.src)
            // a.download = searchParam
            // a.append(gif)

            giphyDiv.append(p)
            giphyDiv.prepend(gif)

            // places the giphyDiv at the top of the giphys div
            $("#giphys").prepend(giphyDiv)
        }
    })
}
//response.data[i].images.fixed_height.url to download gif

// on submit, the userInput value is pushed into the famousPeeps array & previous array is cleared
$("#submit-btn").on("click", function (event) {
    event.preventDefault()

    let newPeep = $("#userInput").val().trim()
    famousPeeps.push(newPeep)
    renderButtons()
})

// displayGifs function reacts to #person-btn on click
$(document).on("click", "#person-btn", displayGifs)

// $('#person-btn').on('click', function () {
//     $('.giphyDiv').toggle()
// })

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



