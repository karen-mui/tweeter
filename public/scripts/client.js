/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const db = require("../../server/lib/in-memory-db");

$(document).ready(function() {

  // turns tweet object into HTML formatted tweet articles 
  const createTweetElement = function(tweetObj) {
    let $tweet = $(`
    <article>
    <header>
      <span><img src=${tweetObj.user.avatars}></i>${tweetObj.user.name}</span>
      <span id="handle">${tweetObj.user.handle}</span>
    </header>
    <div>${tweetObj.content.text}</div>
    <footer>
      <span>${tweetObj.created_at}</span>
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
    console.log('Button clicked, preventing default behaviour and now performing ajax call...');
    console.log($("#tweet-text").serialize());
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $("#tweet-text").serialize()
    })
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

