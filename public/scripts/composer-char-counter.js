$(document).ready(function () {
  
  $("textarea").on("keyup", function () {
    // .val() gets the values of form elements such as input, select and textarea
    const tweetChars = 140 - $(this).val().length;

    $(".counter").html(`${tweetChars}`);

    if (tweetChars < 0) {
      $(".counter").addClass("counter-invalid");
    } else {
      $(".counter").removeClass("counter-invalid");
    }

  });
});
