/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // function to prevent XSS attack (a type of code injection)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="tweet">
      <header>
        <div class="avatar-container">
          <img src=${escape(tweet.user.avatars)}/>
          <span class="name">${escape(tweet.user.name)}</span>
        </div>
        <span class="handle">${escape(tweet.user.handle)}</span>
      </header>
      <span class="user-tweet">${escape(tweet.content.text)}</span>
      <footer>
        <span class="creation-date">${timeago.format(tweet.created_at)}</span>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `;

    return $tweet;
  };

  // function responsible for fetching tweets from the /tweets page
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: renderTweets,
    });
  };

  loadTweets("/tweets", "GET", renderTweets);


  $("form").on("submit", function(event) {
    event.preventDefault();

    const text = $("#tweet-text").val();

    if (text.length > 140) {
      $(".error-empty").slideUp();
      $(".tweet-success").slideUp();
      $(".error-length").slideDown();
      return;
    }
    if (text.length === 0) {
      $(".error-length").slideUp();
      $(".tweet-success").slideUp();
      $(".error-empty").slideDown();
      return;
    } else {
      $(".error-length").slideUp();
      $(".error-empty").slideUp();
    }
       
    // serialize data
    let serializedData = $(this).serialize();

    // POST request that sends the serialized data to the server
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    })
    
    .done(function() {
      loadTweets();
      $(".tweet-success").slideDown();
      $(".error-length").slideUp();
      $(".error-empty").slideUp();
      $("textarea").val("");
    })
    .fail(function() {
      console.log("Error!")
    })
    .always(function() {
      console.log("Finished!");
    });
  });
});
