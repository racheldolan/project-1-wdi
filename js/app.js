$(()=> {
  const rows = 9, cols = 5;
  const $gameCharacter = $('.shooter');
  const shooterFireArray = [];
  const $gridArray = [];
  const $playAgain = $('.play-again');
  const $divWidth = $('.main-box').width();
  const $boxWidth = $('.box-group').width();
  const audio = document.querySelector('audio');
  const $characterPosition = [];
  const $game = $('.game');
  const $playerScore = $('.player-score');
  let direction = true;
  let animateAliensInterval;
  let killCount = 0;
  let speed = 1000;
  let score = 0;
  let shoot = true;


  // instructions disappear and the game begins
  $game.on('click', function(){
    animateAliensInterval = setInterval(() => {
      animateAliens();
    }, speed);
    moveCharacter();
    if($('.game').css('display', 'block')){
      $('.game').css('display', 'none');
      $('.score').css('display', 'block');
    } else {
      $('.game').css('display', 'block');
    }
    $('.instructions').css('display', 'none');
  });

  // Generates grid of aliens
  function generateGrid(){
    for (let i = 0; i < rows; i++) {
      const $newDiv = $('<div>');
      $newDiv.addClass('rows');
      $('.box-group').append($newDiv);

      for (let j = 0; j < cols; j++) {
        const $newDiv2 = $('<div>');
        $newDiv2.addClass('cols');
        $newDiv.append($newDiv2);
        $gridArray.push($newDiv2);
      }
    }
  }
  generateGrid();

  // moves game character left and right
  function moveCharacter(){
    $(document).on('keydown', function(e){
      switch(e.which){
        case 39://right
          if( $gameCharacter.offset().left + $gameCharacter.width() > ($('.main-box').offset().left + $divWidth) - 20) return null;
          $gameCharacter.css('left', '+=25px');
          break;
        case 37://left
          if($gameCharacter.offset().left < ($('.main-box').offset().left + 20)) return null;
          $gameCharacter.css('left', '-=25px');
          break;
      }
    });
  }

  // on space keydown, fires bullets from character position and plays sound fx
  $(document).on('keydown', function(e){
    if(shoot){
      if(shooterFireArray < 1){
        if(e.which === 32){
          //creates bullet div
          const $bullet = $('<div />');
          $bullet.addClass('shooter-fire');
          $('.main-box').append($bullet);
          shooterFireArray.push($bullet);
          // //set initial position of bullet, wherever character is at time
          $characterPosition.push($gameCharacter.offset().left);
          $bullet.css('left', ($characterPosition[$characterPosition.length-1] + $gameCharacter.width()/2) + 'px');
          audio.src = 'sounds/shoot.wav';
          // audio.play();
        }
      }
    }
  });

  //fires the bullet and keeps it moving
  function bulletPath(){
    $('.shooter-fire').css('bottom','+=5px');
    // console.log($('.shooter-fire'));
  }
  setInterval(bulletPath, 10);

  // remove bullet from the dom and shooterFireArray when it leaves the main box
  function bulletRemove(){
    for(let i = 0; i < shooterFireArray.length; i++){
      if(shooterFireArray[i].offset().top < $('.main-box').offset().top){
        shooterFireArray.pop();
        // console.log(shooterFireArray);
      }
    }
  }
  setInterval(bulletRemove, 100);

  // function to move aliens from left to right
  function animateAliens() {
    if (direction) {
      if ($('.box-group').position().left + $boxWidth >= $divWidth - 20) direction = false;
      $('.box-group').css('left', '+=10px');
      $('.box-group').css('bottom', '-=1px');
    } else {
      if ($('.box-group').position().left < ($('.main-box').offset().left + 8)) direction = true;
      $('.box-group').css('left', '-=10px');
    }
  }

  // collision detection between aliens and bullets
  function collisionDetectionBullet(){

    if(!shooterFireArray.length) return false;

    for(let i = 0; i < shooterFireArray.length; i++){
      for(let j = 0; j < $gridArray.length; j++) {

        if((shooterFireArray[i].offset().left < ($gridArray[j].offset().left + $gridArray[j].width())) &&
        (shooterFireArray[i].offset().left > $gridArray[j].offset().left) &&
        (shooterFireArray[i].offset().top > $gridArray[j].offset().top) &&
        (shooterFireArray[i].offset().top < ($gridArray[j].offset().top + $gridArray[j].height()))){
          shooterFireArray[i].remove();
          $gridArray[j].hide();
          killCount++;
          score++;
          speed-=3;
          $playerScore.text(score);
          if(killCount === 15) {
            // clears initial interval and creates new interval
            clearInterval(animateAliensInterval);
            animateAliensInterval = setInterval(() => {
              animateAliens();
            }, speed);
          } else if(killCount === 30){
            // clears initial interval and creates new interval
            clearInterval(animateAliensInterval);
            animateAliensInterval = setInterval(() => {
              animateAliens();
            }, speed);
          }
          // console.log(speed);
          gameWon();
        }
      }
    }
  }
  setInterval(collisionDetectionBullet, 10);

  // function to check collision between boxes and main character
  function collisionDetectionGameCharacter(){
    for(let i = 0; i < $gridArray.length; i++) {
      if(($gameCharacter.offset().left < ($gridArray[i].offset().left + $gridArray[i].width())) &&
      ($gameCharacter.offset().left > $gridArray[i].offset().left) &&
      ($gameCharacter.offset().top > $gridArray[i].offset().top) &&
      (($gameCharacter.offset().left + $gameCharacter.width()) > $gridArray[i].offset().left) &&
      ($gameCharacter.offset().top < ($gridArray[i].offset().top + $gridArray[i].height()))) {
        $gameCharacter.remove();
        gameOver();
      }
    }
  }
  setInterval(collisionDetectionGameCharacter, 10);

  // if there's been no collision, score displays 0
  $playerScore.text(score);

  //brings up game complete banner and plays sound fx
  function gameWon(){
    if(killCount === 45){
      // prevents user from continuing to shoot
      shoot = false;
      if($('.winner').css('display', 'none')){
        $('.winner').css('display', 'block');
      }
      audio.src = './sounds/fanfare.wav';
      audio.play();
      clearInterval(animateAliensInterval);
      clearInterval(collisionDetectionBullet);
    }
  }

  // displays game over banner. plays game over sound fx
  function gameOver(){
    // prevents user from continuing to shoot
    shoot = false;
    $('.game-over').css('display', 'block');
    audio.src = './sounds/explosion 2.wav';
    audio.play();
    clearInterval(animateAliensInterval);
    clearInterval(collisionDetectionBullet);
  }

  // refreshes the screen to play again
  $playAgain.on('click', function(){
    if($('.game-over').css('display', 'block')){
      $('.game-over').css('display', 'none');
    }
    $('window').location.reload();
  });

  // end
});
