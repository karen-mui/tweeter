$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {

    let charsWritten = $(this).val().length
    let charsLeft = 140;
  
    const currentLength = charsLeft - charsWritten

    const counterElem = $(this).siblings("div").children(".counter")

    counterElem.text(currentLength);

    if (currentLength < 0) {
      counterElem.css({
        "color": "red"
      })
    } else {
      counterElem.css({
        "color": "#545149"

      })
    }


  });
 

});