$(()=> {
  const rows = 9, cols = 5;
  const $gameCharacter = $('.shooter');
  const shooterFireArray = [];
  const $playAgain = $('.play-again');
  const $gridArray = [];
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


  // function to make the instructions disappear
  function game(){
    $game.on('click', function(){
      if($('.game').css('display', 'block')){
        $('.game').css('display', 'none');
      } else {
        $('.game').css('display', 'block');
      }
      $('.instructions').css('display', 'none');
    });
  }
  game();

  // displays game over banner
  function gameOver(){
    if($('.game-over').css('display', 'none')){
      $('.game-over').css('display', 'block');
      audio.src = './sounds/explosion 2.wav';
      audio.play();
      clearInterval(animateAliensInterval);
    } else {
      $('.game-over').css('display', 'none');
    }
  }
  // function to refresh the screen and play again
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
  // tests if there's already a bullet on the page

  // if(shooterFireArray.length > 1) canShoot = false;

  // on space keydown, fires bullets from character position and plays sound fx
  $(document).on('keydown', function(e){
    // if(shooterFireArray < 1){
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
      // console.log($characterPosition, $characterPosition[$characterPosition.length - 1]);
    // }
  });


  // function to fire the bullet and keep it moving
  function bulletPath(){
    $('.shooter-fire').css('bottom','+=5px');
    // console.log($('.shooter-fire'));
  }

  setInterval(bulletPath, 10);

  // function intervalTracker() {
  //   console.log(bulletTracker);
  // }

  // setInterval(intervalTracker, 1000);

  // remove bullet from the dom when it leaves the main box - check if working
  function bulletRemove(){
    for(let i = 0; i < shooterFireArray.length; i++){
      if(shooterFireArray[i].offset().top < $('.main-box').offset().top){
        // clearInterval(bulletTracker);
        // shooterFireArray[i].remove();
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
    }, 100);
  }

  // starts the game on click
  $game.on('click', function(){
    animateAliens();
    moveCharacter();
  });

  // function to bring up game complete alert
  function gameComplete(){
    if(killCount === 10){
      if($('.winner').css('display', 'none')){
        $('.winner').css('display', 'block');
      }
      audio.src = './sounds/fanfare.wav';
      audio.play();
      clearInterval(animateAliensInterval);
    }
  }
  gameComplete();

  // test function to see if the grids are leaving the array when collision occurs
  // function length(){
  //   console.log($gridArray.length);
  // }
  // setInterval(length, 1000);

  // test if grids are leaving the grid array


  // make collision detection between boxes and bullet
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
          // const index = $gridArray.indexOf([j]);
          $gridArray[j].hide();
          // $gridArray.splice(index, 1);
          killCount ++;
          console.log(killCount);
          gameComplete();
        }
      }
    }
  }
  setInterval(collisionDetectionBullet, 10);

  // make aliens go faster the less that are still in the array
  // function animateAliensSpeed(){
  //   if($gridArray.length <= 15){
  //     setInterval(animateAliens,10);
  //   }
  // }
  // animateAliensSpeed();


  // // function to check collision between boxes and main character
  function collisionDetectionGameCharacter(){
    for(let i = 0; i < $gridArray.length; i++) {
      if(($gameCharacter.offset().left < ($gridArray[i].offset().left + $gridArray[i].width())) &&
      ($gameCharacter.offset().left > $gridArray[i].offset().left) &&
      ($gameCharacter.offset().top > $gridArray[i].offset().top) &&
      ($gameCharacter.offset().top < ($gridArray[i].offset().top + $gridArray[i].height()))) {
        console.log('game over');
        $gameCharacter.remove();
        gameOver();

        // need to write code to remove grid from the screen
      }
    }
  }
  setInterval(collisionDetectionGameCharacter, 10);

  // end document
});
