$(()=> {
  const rows = 9, cols = 5;
  const $gameCharacter = $('.shooter');
  const shooterFireArray = [];
  const $gridArray = [];
  const $playAgain = $('.play-again');
  const $gameOver = $('.game-over');
  const $mainBox = $('.main-box');
  const $divWidth = $('.main-box').width();
  const $boxWidth = $('.box-group').width();
  const audio = document.querySelector('audio');
  const $characterPosition = [];
  const $game = $('.game');
  let direction = true;
  let animateAliensInterval;
  let killCount = 0;
  // let speed = 100;
  const $playerScore = $('.playerScore');
  let score = 0;
  let shoot = true;


  // function to make the instructions disappear
  function game(){
    $game.on('click', function(){
      animateAliens();
      moveCharacter();
      if($('.game').css('display', 'block')){
        $('.game').css('display', 'none');
        $('.score').css('display', 'block');
      } else {
        $('.game').css('display', 'block');
      }
      $('.instructions').css('display', 'none');
    });
  }
  game();

  // refreshes the screen and play again
  $playAgain.on('click', function(){
    if($('.game-over').css('display', 'block')){
      $('.game-over').css('display', 'none');
    }
    $('window').location.reload();
  });

  // Generate grid of divs
  function generateGrid(){
    for (let j = 0; j < rows; j++) {
      const $newDiv = $('<div>');
      $newDiv.addClass('rows');
      $('.box-group').append($newDiv);

      for (let i = 0; i < cols; i++) {
        const $newDiv2 = $('<div>');
        $newDiv2.addClass('cols');
        $newDiv.append($newDiv2);
        $gridArray.push($newDiv2);
        // console.log($gridArray);
      }
    }
  }
  generateGrid();

  // moves character left and right
  function moveCharacter(){
    $(document).on('keydown', function(e){
      switch(e.which){
        case 39://right
          if( $gameCharacter.offset().left + $gameCharacter.width() > ($('.main-box').offset().left + $divWidth)) return null;
          $gameCharacter.css('left', '+=25px');
          break;
        case 37://left
          if($gameCharacter.offset().left < ($('.main-box').offset().left + 8)) return null;
          $gameCharacter.css('left', '-=25px');
          break;
      }
    });
  }

  // on space keydown, fires bullets from character position and plays sound fx
  if(shoot){
    $(document).on('keydown', function(e){
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
          audio.play();
        }
      }
    });
  }
  // function to fire the bullet and keep it moving
  function bulletPath(){
    $('.shooter-fire').css('bottom','+=5px');
    // console.log($('.shooter-fire'));
  }

  setInterval(bulletPath, 10);

  // remove bullet from the dom when it leaves the main box - check if working
  function bulletRemove(){
    for(let i = 0; i < shooterFireArray.length; i++){
      if(shooterFireArray[i].offset().top < $('.main-box').offset().top){
        shooterFireArray.pop();
        // console.log(shooterFireArray);
      }
    }
  }
  setInterval(bulletRemove, 100);

  // function to move boxes from left to right
  function animateAliens(){
    animateAliensInterval = setInterval(function(){
      if(direction){
        if($('.box-group').position().left + $boxWidth >= $divWidth) direction = false;
        // if($('.box-group').position().left + $boxWidth > ($('.main-box').offset().left + $divWidth)) direction = false;
        $('.box-group').css('left', '+=10px');
        $('.box-group').css('bottom', '-=1px');
      } else {
        // if($('.box-group').position().left < 0) direction = true;
        if($('.box-group').position().left < ($('.main-box').offset().left + 8)) direction = true;
        $('.box-group').css('left', '-=10px');
      }
    }, 10);
  }
  //
  // animateAliensInterval = setInterval(() => {
  //   animateAliens();
  // }, speed);

  // collision detection between boxes and bullet
  function collisionDetectionBullet(){

    if(!shooterFireArray.length) return false;
    // console.log(shooterFireArray);

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
          $playerScore.text(score);
          // if(killCount === 10) {
          //   console.log('here', killCount);
          //   speed-=10; //90
          //   animateAliens(speed);
          // } else if(killCount === 15){
          //   console.log('here', killCount);
          //   speed-=10; //80
          //   animateAliens(speed);
          // }
          // console.log(speed);
          gameWon();
        }
      }
    }
  }
  setInterval(collisionDetectionBullet, 10);


  // // function to check collision between boxes and main character
  function collisionDetectionGameCharacter(){
    for(let i = 0; i < $gridArray.length; i++) {
      if(($gameCharacter.offset().left < ($gridArray[i].offset().left + $gridArray[i].width())) &&
      ($gameCharacter.offset().left > $gridArray[i].offset().left) &&
      ($gameCharacter.offset().top > $gridArray[i].offset().top) &&
      // new lines added below. doesn't work.
      // (($gameCharacter.offset().left + $gameCharacter.width()) < $gridArray[i].offset().left) &&
      // ($gameCharacter.offset().left > $gridArray[i].offset().left) &&
      ($gameCharacter.offset().top < ($gridArray[i].offset().top + $gridArray[i].height()))) {
        console.log('game over');
        $gameCharacter.remove();
        gameOver();
      }
    }
  }
  setInterval(collisionDetectionGameCharacter, 10);
  // if there's been no collision, display 0
  $playerScore.text(score);

  // function to bring up game complete alert
  function gameWon(){
    if(killCount === 45){
      if($('.winner').css('display', 'none')){
        $('.winner').css('display', 'block');
      }
      audio.src = './sounds/fanfare.wav';
      audio.play();
      clearInterval(animateAliensInterval);
      (!shoot);
    }
  }
  gameWon();

  // displays game over banner. plays game over noise.
  function gameOver(){
    $('.game-over').css('display', 'block');
    audio.src = './sounds/explosion 2.wav';
    audio.play();
    clearInterval(animateAliensInterval);
    (!shoot);
  }

  // end document
});
