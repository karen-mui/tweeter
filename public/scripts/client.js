/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $("#error").hide();

  // preventing cross-site scripting (XSS)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // turns tweet object into HTML formatted tweet articles 
  const createTweetElement = function(tweetObj) {
    let $tweet = $(`
    <article>
    <header>
      <span><img src=${tweetObj.user.avatars}></i>${tweetObj.user.name}</span>
      <span id="handle">${tweetObj.user.handle}</span>
    </header>
    <div>${escape(tweetObj.content.text)}</div>
    <footer>
      <span>${timeago.format(tweetObj.created_at)}</span>
      <span><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i
          class="fa-solid fa-heart"></i></span>
    </footer>
    </article>
    `);

    return $tweet;
  };

  // inserts HTMl of tweets into the tweet-container section of the DOM
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $('#tweet-container').append(createTweetElement(tweet));
    }
  }


  // AJAX implementation for sending (POST) tweet to server 
  $("form").submit(function (event) {
    event.preventDefault();
    $("#error").hide();
    if ($("#tweet-text").val().length === 0 || $("#tweet-text").val() === null ) {
      $("#error").text('What\'s on your mind? Tweet tweet.')
      $("#error").slideDown();
      // window.alert('type something')
    } else if ($("#tweet-text").val().length > 140) {
      $("#error").text('Nobody wants to read that much text! 🙅')
      $("#error").slideDown();
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $("#tweet-text").serialize()
      })
      .then($("body").load("/"))
    }
  });

  // AJAX implementation for retrieving (GET) data from the server 
  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
    })
    .then(function (tweets) {
      renderTweets(tweets)
    })
  }

  loadTweets();

});

