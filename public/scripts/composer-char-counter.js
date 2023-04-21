$(document).ready(function () {
  
  $("textarea").on("keyup", function () {
    // .val() gets the values of form elements such as input, select and textarea
    let tweetChars = 140 - $(this).val().length;
    console.log(tweetChars - 1);

    $(".counter").html(`${tweetChars}`);

    if (tweetChars < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });
});
