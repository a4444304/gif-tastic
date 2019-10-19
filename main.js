// Array of Beverages
var drinks = ['Coffee','Tea','Hot Chocolate'];
var apikey = "HLNwuzvvaYkYWyLRj7l2z8WQoa3dg5j5";

var $view = $("#gif-searches");

// Function for displaying the Gifs
function displayTopicGifs() {
// This will remove any previous Gifs
$view.empty();
// To pick a beverage
var beverage = $(this).attr("data-name");
// Builds the queryURL
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + beverage + "&api_key=" + apikey + "&limit=10";
// Ajax Call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    var data = response.data; 
    // To get the response data

    for (var b = 0; b < data.length; b++) {
        var $img = $("<img>");
        var $p = $("<p>");
        var rating = data[b].rating;
        $p.text(rating);

    // This gives data-attributes to the Gifs
    $img.attr("src", data[b].images.fixed_height_still.url)
    $img.attr("class", "gify")
    $img.attr("data-state", "still");
    $img.attr("data-name", beverage + b);
    $img.attr("data-animate", data[b].images.fixed_height.url);
    $img.attr("data-still", data[b].images.fixed_height_still.url);

    $view.append($p);
    $view.append($img);
    }
});
}
// To animate the Gifs
function animate() {
    var stateOfImage = $(this).attr("data-state");
    // If the state is still, animate the image
    if(stateOfImage === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
// Function for  displaying topics as buttons
function renderButtons() {
    // This cleans up the button area
    $("#buttonsArea").empty();
    // This will loop through the array of beverages
    for (var i=0; i<drinks.length; i++) {
        // This makes buttons for each drink
        var a = $("<button>");
        // Adding a class of topic to the button
        a.addClass("topic");
        // Adding a data-attribute to variable a
        a.attr("data-name", drinks[i]);
        // Providing the initial button text
        a.text(drinks[i]);
        // Adding the button to the buttons area div
        $("#buttonsArea").append(a);
    }
}
// This function handles events when one button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();
// This line takes the input from the textbox
var topic = $("#search-tab").val().trim();
// Adds the beverages from the textbox to our array
drinks.push(topic);
// Calling the renderButtons
renderButtons();
});
// Function for display the drinks Gifs
$(document).on("click",".topic", displayTopicGifs);
// Function for animating the Gifs
$(document).on("click", ".gify", animate);
// Calling the renderButtons function to display the inital buttons
renderButtons();











