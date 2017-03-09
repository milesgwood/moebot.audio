window.onload = function () {
    try {  // for Firefox, IE7, Opera
        request = new XMLHttpRequest()
        request.onreadystatechange = updatePage
    }
    catch (exc) {
        try {  // for IE6
            request = new ActiveXObject('MSXML2.XMLHTTP.5.0')
            request.onreadystatechange = updatePage
        }
        catch (e) {
            request = false
        }
    }
    if (!request) {
        alert("Error initializing XMLHttpRequest!");
        showAllButtons()
    }
    // showAllButtons()
}

// http://www.webreference.com/programming/javascript/onloads/index.html

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

function botStart() {
  addLoadingAnimation();
  console.log('botStarted');
  var url = "/start";
  request.open("GET", url, true);
  request.send();
}

function addLoadingAnimation() {
  $("#chatUl").append('<div id="loadingBot"><li class="botmsg">' +
      '<div class="typing-indicator">'+
        '<span></span>' +
        '<span></span>'+
        '<span></span>'+
      '</div></li></div>');
}

function removeLoadingAnimation(){
  var loadingBot = document.getElementById('loadingBot');
  loadingBot.parentNode.removeChild(loadingBot);
  console.log('Animation removed');
}

function addBotResponse(serverResponse){
  setTimeout(function() {
    removeLoadingAnimation();
    $("#chatUl").append(serverResponse);
  }, 350);
  console.log('Adding bot response');
}

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
  // $("#main_options").css("display", "none");
  // $("#play").css("display", "none");
  $("#like").css("display", "none");
  $("#review").css("display", "none");

  // $("#start_options").css("display", "flex");
  $("#main_options").css("display", "flex");
  $("#play").css("display", "flex");
  // $("#like").css("display", "flex");
  // $("#review").css("display", "block");
  toBottom();
}

function showLikeButtons()
{
  $("#start_options").css("display", "none");
  $("#main_options").css("display", "none");
  $("#play").css("display", "none");
  // $("#like").css("display", "none");
  $("#review").css("display", "none");

  // $("#start_options").css("display", "flex");
  // $("#main_options").css("display", "flex");
  // $("#play").css("display", "flex");
  $("#like").css("display", "flex");
  // $("#review").css("display", "block");
  toBottom();
}

function showReviewButtons()
{
  $("#start_options").css("display", "none");
  $("#main_options").css("display", "none");
  $("#play").css("display", "none");
  $("#like").css("display", "none");
  // $("#review").css("display", "none");

  // $("#start_options").css("display", "flex");
  // $("#main_options").css("display", "flex");
  // $("#play").css("display", "flex");
  // $("#like").css("display", "flex");
  $("#review").css("display", "block");
  toBottom();
}


function toBottom(){
console.log("Scrolling to bottom ...");
window.scrollTo(0, document.body.scrollHeight);
}

function updatePage() {
  console.log('In update page function');
    if (request.readyState == 4) {
        if (request.status == 200) {
            var res = request.responseText;
            console.log('200 response :' + res);
            addBotResponse(res);
        }
        else {
          console.log("Error: status code " + request.status);
          // alert("Error: status code " + request.status)
        }
    }
}

function addUserResponse(buttonClicked) {
    $("#chatUl").append('<li class="usrmsg">' +
    '<p class="triangle-right top">' +
    buttonClicked.value +
    '</p>' +
    '</li>');
    console.log('New Item in list: ' + buttonClicked.value);
    console.log("User triggered :" + buttonClicked.id);
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


function submitUserComment() {
  var comment = document.getElementById('userComment');
  console.log('Comment added: ' + comment.value);
  // Submit the comment to the databse here
  toBottom();
}
