window.counter = 0;
window.startKidsTop = "";
window.startKidsLeft = "";
window.startBalloonTop = "";

window.addEventListener("click", function resizeBalloon(event) {
    const balloon = document.querySelector(".balloon-inside");
    const kidsFlying = document.querySelector(".kids-inside");
    const tryAgain = document.querySelector(".try-again");
    const explosion = document.querySelector(".explosion");
    if (event.target === balloon) {
      let size1 = window.getComputedStyle(balloon, null).getPropertyValue("width")
      let heightTop = window.getComputedStyle(balloon, null).getPropertyValue("margin-top");
      let kidsTop = window.getComputedStyle(kidsFlying, null).getPropertyValue("margin-top");
      let kidsLeft = window.getComputedStyle(kidsFlying, null).getPropertyValue("margin-left");
      counter++;
      if (counter === 1) {
        startKidsTop = kidsTop;
        startKidsLeft = kidsLeft;
        startBalloonTop = heightTop;
      }
      let larger = parseFloat(size1);
      if (larger >= 100) {
        let kaboom = new Audio("balloon_popping.mp3")
        let playKaboom = kaboom.play();
        if (playKaboom !== undefined) {
          playKaboom.then(_ => {
            // Automatic playback started!
      	    // Show playing UI.
    	    })
    	    .catch(error => {
            // Auto-play was prevented
      	    // Show paused UI.
    	    });
  	    }
        let delay = setTimeout(() => {
          kidsFlying.style.marginTop = startKidsTop;
          kidsFlying.style.marginLeft = startKidsLeft;
          balloon.style.visibility = "hidden";
          explosion.style.visibility = "visible";
          balloon.style.cursor = "default";
          tryAgain.style.visibility = "visible";
          window.removeEventListener("click", resizeBalloon);
          window.addEventListener("click", event => {
            if (event.target === tryAgain) {
              tryAgain.style.visibility = "hidden";
              balloon.style.visibility = "visible";
              balloon.style.cursor = "pointer";
              explosion.style.visibility = "hidden";
              balloon.style.width = "40px"
              balloon.style.marginTop = startBalloonTop;
              event.preventDefault();
              window.addEventListener("click", resizeBalloon);
            }
          });
        }, 100);  
      } else {
        let expand = new Audio("balloon_blowing_up.mp3")
        let playExpand = expand.play();
        if (playExpand !== undefined) {
          playExpand.then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
  	    }
        let delay2 = setTimeout(() => {
          balloon.style.width = larger * 1.2 + "px";
          let higherTop = parseInt(heightTop);
          let kidsHigherTop = parseInt(kidsTop);
          let kidsLefter = parseFloat(kidsLeft);
          balloon.style.marginTop = higherTop - 25 + "px";
          kidsFlying.style.marginTop = kidsHigherTop - 10 + "px";
          kidsFlying.style.marginLeft = kidsLefter + 6 + "px";
          event.preventDefault();
        }, 100);
      }
    }
})
