//Global Variables
var request;
var currentShow;
var nextSongIndex = 0;
var welcomMessage = "Chat with me to sift through the 28 years of live moe. recordings in search of forgotten gems. If you're busy working you can just listen, and I'll keep the music flowing."
//Used to automatically start the next song. Needs to be cleared when user clicks anything.
var autoPlayTimeout;
var loadingNextSongTimeout;

window.onload = function () {
    try {  // for Firefox, IE7, Opera
        request = new XMLHttpRequest();
        request.onreadystatechange = updatePage;
    }
    catch (exc) {
        try {  // for IE6
            request = new ActiveXObject('MSXML2.XMLHTTP.5.0');
            request.onreadystatechange = updatePage;
        }
        catch (e) {
            request = false;
        }
    }
    if (!request) {
        alert("Error initializing XMLHttpRequest!");
        showAllButtons();
    }
    // showAllButtons()
}

// http://www.webreference.com/programming/javascript/onloads/index.html

//This adds a function to the loading of the first page
//This sends the bot start message
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}
addLoadEvent(botStart);

//Once the page loads the bot will say it's default messages.
function botStart() {
  addLoadingAnimation();
  addBotResponse(formatBotResponse(welcomMessage));
  addLoadingAnimation();
  var url = "/start";
  request.open("GET", url, true);
  request.send();
}

//Adds the loading animation at the bottom of the chat
function addLoadingAnimation() {
  $("#chatUl").append('<div id="loadingBot"><li class="botmsg">' +
      '<div class="typing-indicator">'+
        '<span></span>' +
        '<span></span>'+
        '<span></span>'+
      '</div></li></div>');
      console.log('Added Animation ');
}

//Removes the loading animation at the bottom of the chat
function removeLoadingAnimation(){
  var loadingBot = document.getElementById('loadingBot');
  if(loadingBot)
  {
    loadingBot.parentNode.removeChild(loadingBot);
    console.log('Removed Animation');
  }
}

//This adds the bot response directly directly.
//It doesn't have the li ro span tag around it
//Cal formatBotResponse to put the li and span tags around it first
function addBotResponse(serverResponse){
    removeLoadingAnimation();
    $("#chatUl").append(serverResponse);
    toBottom();
}

//Formats the bot response with a li and span tag
function formatBotResponse(unformattedString){
  var open = '<li class="talk-bubble tri-left round border left-top botmsg">'
              + '<span class="archive-bubble">' ;
  var close = '</span></li>' ;
  return open + unformattedString + close;
}


//The following methods deal with showing the proper buttons
function hideAllButtons()
{
  $("#start_options").css("display", "none");
  $("#main_options").css("display", "none");
  $("#play").css("display", "none");
  $("#like").css("display", "none");
  $("#review").css("display", "none");
}

function showAllButtons()
{
  $("#start_options").css("display", "flex");
  $("#main_options").css("display", "flex");
  $("#play").css("display", "flex");
  $("#like").css("display", "flex");
  $("#review").css("display", "block");
}

function showMainPlayButtons()
{
  $("#start_options").css("display", "none");
  $("#like").css("display", "none");
  $("#review").css("display", "none");
  $("#main_options").css("display", "flex");
  $("#play").css("display", "flex");
  toBottom();
}

function showLikeButtons()
{
  $("#start_options").css("display", "none");
  $("#main_options").css("display", "none");
  $("#play").css("display", "none");
  $("#review").css("display", "none");
  $("#like").css("display", "flex");
  toBottom();
}

function showReviewButtons()
{
  $("#start_options").css("display", "none");
  $("#main_options").css("display", "none");
  $("#play").css("display", "none");
  $("#like").css("display", "none");
  $("#review").css("display", "block");
  toBottom();
}


function toBottom(){
window.scrollTo(0, document.body.scrollHeight);
}

function addUserResponse(buttonClicked) {
    $("#chatUl").append('<li class="usrmsg">' +
    '<p class="triangle-right top">' +
    buttonClicked.value +
    '</p>' +
    '</li>');
    // Get the next item from the server and show the proper buttons
    getBotResponse(buttonClicked.id);
    displayCorrectButtons(buttonClicked.id);
};

function getBotResponse(source)
{
  addLoadingAnimation();
  var url = "/" + source;
  request.open("GET", url, true);
  request.send();
  console.log('Requesting:' + url);
}

function displayCorrectButtons(source){
  if(source == 'makeReview')
  {
    console.log('setting the buttons for a review')
    showLikeButtons();
  }
  else if(source == 'loveIt')
  {
    console.log('Ratings buttons');
    showReviewButtons();
  }
  else {
    showMainPlayButtons();
  }
  toBottom();
}


function submitUserComment(buttonClicked) {
  var comment = document.getElementById('userComment').value;
  console.log('Comment added: ' + comment.value);
  showUserComment(comment);
  addLoadingAnimation();
  var url = "/makeReview";
  //Since this gets submitted as a POST it takes a parameter
  request.open("POST", url, true);
  request.send("comment="+comment);
  displayCorrectButtons(buttonClicked.id);
  toBottom();
}

function showUserComment(comment)
{
  $("#chatUl").append('<li class="usrmsg">'
  + '<p class="triangle-right top">'
  + comment
  + '</p>'
  + '</li>');
}
//Scripts added as of March 2017 -- view version 3

function formatNextSongInPlaylist() {
  var open = '<li class="talk-bubble tri-left round border left-top botmsg">'
              + '<span class="archive-bubble">' ;
  var frame = '<iframe src="https://archive.org/embed/'
                + currentShow.showUrl + '/' + currentShow.setList[nextSongIndex%currentShow.setList.length].name
                + '&autoplay=true"'
                + ' width="500" height="30" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true"'
                + ' allowfullscreen>Description of song</iframe>'
  var song = currentShow.setList[nextSongIndex%currentShow.setList.length]
  var songData =  '<br><div class="songMetaText">Song:\t</div>'  +' '+ song.title
                //+ '<br><div class="songMetaText">Date:</div>'  +' '+ currentShow.date
                + '<br><div class="songMetaText">Venue:</div>' +' '+ currentShow.venue
                + '<br><div class="songMetaText">Show:</div>'  +' '+ currentShow.showName
                + '<br><div class="songMetaText">Length:</div>'+' '+ song.length + ' sec'
                + '<br><div class="songMetaText">Album:</div>' +' '+ song.album
  var close = '<br> Enjoy, you moe.ron :)</span></li>' ;
  var body = open + frame + songData + close;
  nextSongIndex++;
  return body;
}

function updateCurrentShow(unformattedResponse)
{
  var show = JSON.parse(unformattedResponse);
  currentShow = show;
  nextSongIndex = 0;
}

function updatePage() {
  console.log('In update page function');
    if (request.readyState == 4) {
        if (request.status == 200) {
            var res = request.responseText;
            var resType = request.getResponseHeader("Content-Type");

            //If we get JSON data we have a show object
            if(resType == "application/json;charset=UTF-8") {
              console.log('200 response JSON: New Show');
              updateCurrentShow(res);
              playNextSong();
            }
            //Otherwise we just have a bot response
            else {
              console.log('200 response TEXT:' + res);
              addBotResponse(formatBotResponse(res));
            }
        }
        else {
          console.log("Error: status code " + request.status);
          // alert("Error: status code " + request.status)
        }
    }
}

//This button gets called directly by the Play Next Song Button
//We want to play the next song in the same show setList
//The show is already stored in global memory
function userClickedPlayNextSong(buttonClicked)
{
  //First stop the autoplay
  clearTimeout(autoPlayTimeout);
  clearTimeout(loadingNextSongTimeout);
  $("#chatUl").append('<li class="usrmsg">' +
  '<p class="triangle-right top">' +
  buttonClicked.value +
  '</p>' +
  '</li>');
  console.log('New Item in list: ' + buttonClicked.value);
  console.log("User triggered :" + buttonClicked.id);
  playNextSong(buttonClicked.id);
  displayCorrectButtons(buttonClicked.id);
}

//This makes the previous song's player disappear
function removeSongPlayers()
{
    var elements = document.getElementsByTagName('iframe');
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
}

function playNextSong()
{
  //This function needs to check if the Show is a good show and collect errors if it is not a good show
  removeLoadingAnimation();
  addLoadingAnimation();
  if(currentShow.setList.length == 0)
  {
      console.log("ERROR: Empty Setlist Show ID: " + currentShow.id);
      addBotResponse("The show with ID " + currentShow.id + " is broken. Let me find another show.");
      getBotResponse("getNextShow");
  }
  else
  {
    var nextSong = formatNextSongInPlaylist();
    //Find out how long the current song is and set up the call for the next song
    var songLength = currentShow.setList[(nextSongIndex-1)%(currentShow.setList.length)].length * 1000;
    if(songLength == 0)
    {
      console.log("ERROR: Empty Song Length Song ID: " + nextSong.id + " Show ID: " + currentShow.id);
      addBotResponse("Wait a second... This show has corrupted songs. Show ID: " + currentShow.id + " needs fixing. Let me find another show.");
      getBotResponse("getNextShow");
    }
    else //The song can play and we set the auto play to the song's length
    {
        autoPlayTimeout = setTimeout(playNextSong, songLength);
        loadingNextSongTimeout = setTimeout(addLoadingAnimation, songLength - 400);
        console.log("Song Length: " + songLength);
        removeSongPlayers();
        addBotResponse(nextSong);
    } 
  }
}
