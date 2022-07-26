//button animation
var animateButton = function(e) {

    e.preventDefault;

    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
var locButtons = document.getElementsByClassName("loc-btn");
  
for (var i = 0; i < locButtons.length; i++) {
    locButtons[i].addEventListener('click', animateButton, false);
}


//geting location and send to server and callback response
function getLocation() {

  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      document.getElementById("lat").innerHTML = lat; //to paste value inside html tag
      document.getElementById("lng").innerHTML = lng;


  
      const data = { lat, lng};


      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };


      const response = await fetch('/api', options);
      const clb = await response.json();


      
      console.log(clb);
    });
    
  } else {
    console.log("Location information is unavailable.");
  }
};

//floating animation
var lFollowX = 0,
lFollowY = 0,
x = 0,
y = 0,
friction = 1 / 30;

function animate() {
x += (lFollowX - x) * friction;
y += (lFollowY - y) * friction;

translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

$('.loc-btn').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
});

window.requestAnimationFrame(animate);
}

$(window).on('mousemove click', function (e) {

var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
lFollowY = (10 * lMouseY) / 100;

});

animate();
