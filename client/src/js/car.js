document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".carousel");
  var instance = M.Carousel.init(elems, options);
});

var instance = M.Carousel.init({
  fullWidth: true
});
