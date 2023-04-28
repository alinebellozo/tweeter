/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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
          <img src=${tweet.user.avatars}/>
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <span class="user-tweet">${tweet.content.text}</span>
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

const resetForm = function() {
  document.getElementById("tweet-form").reset();
};


  $("form").on("submit", function(event) {
    event.preventDefault();

    const text = $("textarea").length;

    if (text.length > 140) {
      return alert("Oops, this tweet is too long.");
    } else if (!text) {
      return alert("Oops, your tweet can't be blank.");
    } else {
      // serialize data
      let serializedData = $(this).serialize();
      $("#textarea").val("");

      // POST request that sends the serialized data to the server
      $.post({ 
        url: "/tweets",
        method: "POST",
        data: serializedData,
      })
        .done(function () {
          alert("Success!");
          resetForm();
        })
        .fail(function () {
          alert("Error");
        })
        .always(function () {
          console.log("Finished!");
        });

      loadTweets();
    }
  });
});
