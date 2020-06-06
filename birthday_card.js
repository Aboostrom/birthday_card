window.counter = 0;
window.startKidsTop = "";
window.startKidsLeft = "";
window.startBalloonTop = "";

window.addEventListener("click", function resizeBalloon(event) {
    const balloon = document.querySelector(".balloon-inside");
    const kidsFlying = document.querySelector(".kids-inside");
    const tryAgain = document.querySelector(".try-again");
    if (event.target === balloon) {
      let size1 = window.getComputedStyle(balloon, null).getPropertyValue("font-size")
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
      if (larger >= 120) {
        let kaboom = new Audio("http://soundbible.com/mp3/Balloon%20Popping-SoundBible.com-1247261379.mp3")
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
        kidsFlying.style.marginTop = startKidsTop;
        kidsFlying.style.marginLeft = startKidsLeft;
        balloon.innerHTML = "💥";
        balloon.style.cursor = "default";
        tryAgain.style.visibility = "visible";
        window.removeEventListener("click", resizeBalloon);
        window.addEventListener("click", event => {
          if (event.target === tryAgain) {
            tryAgain.style.visibility = "hidden";
            balloon.style.cursor = "pointer";
            balloon.innerHTML = "🎈";
            balloon.style.fontSize = "60px"
            balloon.style.marginTop = startBalloonTop;
            event.preventDefault();
            window.addEventListener("click", resizeBalloon);
          }
        });
      } else {
        let expand = new Audio("http://soundbible.com/mp3/Balloon%20Blowing%20Up-SoundBible.com-1989230335.mp3")
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
        balloon.style.fontSize = larger * 1.1 + "px";
        let higherTop = parseInt(heightTop);
        let kidsHigherTop = parseInt(kidsTop);
        let kidsLefter = parseFloat(kidsLeft);
        balloon.style.marginTop = higherTop - 25 + "px";
        kidsFlying.style.marginTop = balloon.getBoundingClientRect().bottom + window.pageYOffset - 120 + "px";
        kidsFlying.style.marginLeft = kidsLefter + 1.5 + "px";
        event.preventDefault();
      }
    }
})
