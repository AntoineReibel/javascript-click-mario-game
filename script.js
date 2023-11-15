let gameScreen = document.querySelector('.gameScreen')
let scoreHtml = document.querySelector('.counter')
let score = 0
let targetTotal = 10
scoreHtml.innerHTML = score
let titleScreen = document.querySelector('.titleScreen')
let marioFace = document.querySelector('.marioFace')
let yoyo

document.querySelector('.greyScreen').addEventListener('click', function () {
  let startAudio = document.getElementById('startAudio');
  startAudio.play();
  this.style.display = 'none'
  title()
})


// Target----------------------------------------------------

function createTarget() {
  let target = document.createElement('img')
  target.classList.add('target')
  target.src = 'goomba.svg'
  let randomLeft = Math.random() * (gameScreen.offsetWidth - 100);
  let randomTop = Math.random() * (gameScreen.offsetHeight - 100);
  target.style.left = randomLeft + 'px';
  target.style.top = randomTop + 'px';
  gameScreen.appendChild(target)

  target.addEventListener('click', function () {
    this.style.pointerEvents = 'none'
    scoreHtml.innerHTML = ++score
    let clickCoin = document.getElementById('coin')
    clickCoin.currentTime = 0;
    clickCoin.play();
    gsap.to(this,
      {
        scale: 0,
        rotation: 360,
        duration: 1,
        onComplete: function () {
          target.remove()
        }
      })
  })

  gsap.to(target, {
    delay: 0.5 + Math.random() * 2,
    scale: 0,
    onComplete: function () {
      target.remove()
    }
  })

}

function createTargetsRecursively(count) {
  if (count <= 0) {
    setTimeout(function () { 
      gameOver() 
      document.getElementById('gameOverAudio').play();
    }, 1500)
    return;
  }
  createTarget();
  setTimeout(function () {
    createTargetsRecursively(count - 1);
  }, 500 + Math.random() * 2000);
}

// Titre Animations ------------------------------------------------------------------

function title() {
  
  gsap.to(marioFace, {
    scale: 1,
    duration: 4,
    ease: "elastic.out(1,0.3)",
  })

  let title = document.querySelector('.title')
  gsap.from(title, {
    duration: 4,
    y: -500,
    ease: "bounce.out",
  })

  let play = document.querySelector('.play')
  gsap.from(play, {
    delay: 4,
    duration: 2,
    scale: 0,
    ease: "elastic.out(1,0.3)",
  })

  play.addEventListener('mouseover', function () {
    yoyo = gsap.to(this, {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
    })
  })

  play.addEventListener('mouseout', function () {
    if (yoyo) {
      yoyo.kill()
    }
    gsap.to(this, {
      scale: 1,
      duration: 0.5,
    })
  })

  play.addEventListener('click', function () {
    this.style.pointerEvents = 'none'
    let audio = document.getElementById('audio');
    audio.play();
    gsap.to(title, {
      duration: 1,
      ease: "back.in(1)",
      x: -1500
    });

    gsap.to(marioFace, {
      delay: 0.5,
      duration: 1,
      ease: "back.in(1)",
      x: -1500
    });

    gsap.to(this, {
      delay: 1,
      duration: 1,
      ease: "back.in(1)",
      x: -1500,
      onComplete: function () {
        titleScreen.remove()
      }
    });

    gsap.to('.score', {
      delay: 2,
      opacity: 1,
      duration: 4,
      onComplete: function () {
        createTargetsRecursively(targetTotal)
      }
    })
  })
}

// Game Over ------------------------------------------------------------------
let finalScore = document.querySelector('.finalScore')
let evaluation = document.querySelector('.evaluation')
let replay = document.querySelector('.replay')
let gameOverScreen = document.querySelector('.gameOverScreen')

function gameOver() {


  finalScore.innerHTML = "Score : " + score
  if (score == 10) {
    evaluation.innerHTML = "Parfait !"
  } else if (score < 10 && score > 6) {
    evaluation.innerHTML = "Pas mal !"
  } else if (score <= 6 && score > 3) {
    evaluation.innerHTML = "Peut mieux faire !"
  } else {
    evaluation.innerHTML = "Nul !"
  }
  gameOverScreen.style.display = 'flex'

  gsap.to(finalScore, {
    duration: 1,
    scale: 1,
    ease: "elastic.out(1.5,0.3)",
  })
  gsap.to(evaluation, {
    delay: 1,
    duration: 1,
    scale: 1,
    ease: "elastic.out(1.5,0.3)",
  })
  gsap.to(replay, {
    delay: 2,
    duration: 1,
    scale: 1,
    ease: "elastic.out(1.5,0.3)",
  })

  let yoyo2
  replay.addEventListener('mouseover', function () {
    yoyo2 = gsap.to(this, {
      scale: 1.2,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
    })
  })

  replay.addEventListener('mouseout', function () {
    if (yoyo2) {
      yoyo2.kill()
    }
    gsap.to(this, {
      scale: 1,
      duration: 0.5,
    })
  })

}

// Replay ------------------------------------------------------------------

replay.addEventListener('click', function () {
  this.style.pointerEvents = 'none'
  let audio = document.getElementById('audio');
    audio.play();
  gsap.to(finalScore, {
    duration: 1,
    ease: "back.in(1)",
    x: -1500
  });

  gsap.to(evaluation, {
    delay: 0.5,
    duration: 1,
    ease: "back.in(1)",
    x: -1500
  });

  gsap.to(this, {
    delay: 1,
    duration: 1,
    ease: "back.in(1)",
    x: -1500,
    onComplete: function () {
      replay.style.pointerEvents = 'all'
      gsap.set(gameOverScreen, {
        display: 'none'
      })
      gsap.set(finalScore, {
        x: 0,
        scale: 0
      })
      gsap.set(evaluation, {
        x: 0,
        scale: 0
      })
      gsap.set(replay, {
        x: 0,
        scale: 0
      })
    }

  });

  gsap.to('.counter', {
    delay: 2,
    onComplete: function () {
      score = 0
      scoreHtml.innerHTML = score
      createTargetsRecursively(targetTotal)
    }
  })
})