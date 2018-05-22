$(()=>{
  const rows = 9, cols = 5;
  const $gameCharacter = $('.shooter');
  // const $boxes = $('.box');
  const shooterFireArray = [];
  const $playAgain = $('.play-again');
  let $gridArray = [];
  const $gameOver = $('.game-over');
  const $mainBox = $('.main-box');
  const $box = $('.box-group');
  // const $box = $('.box');
  const $divWidth = $('.main-box').width();
  const $boxWidth = $('.box-group').width();
  const audio = document.querySelector('audio');
  // let marginBotton;
  const $characterPosition = [];
  const $button = $('button');
  const $game = $('.game');
  let direction = true;

  // function to make the instructions disappear
  $game.on('click', function(){
    if($('.game').css('display', 'block')){
      $('.game').css('display', 'none');
    } else {
      $('.game').css('display', 'block');
    }
  })

  function gameOver(){
    if($('.game-over').css('display', 'none')){
      $('.game-over').css('display', 'block');
    } else {
      $('.game-over').css('display', 'none');
    }
  }

  // $playAgain.on('click', function(){
  //   gameOver();
  //   animateAliens();
  //   moveCharacter();
  // })

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



  $(document).on('keydown', function(e){
    if(e.which === 32){
      // marginBotton +=5;
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
      // console.log($characterPosition, $characterPosition[$characterPosition.length - 1]);
    }
    // initialBulletPosition();
  });
  // function initialBulletPosition(){
  //   $('.shooter-fire').css('left', $characterPosition[$characterPosition.length-1] + 'px');
  // }

  // function to fire the bullet and keep it moving
  function bulletMove(){
    $('.shooter-fire').css('bottom','+=5px');
  }
  // need to add clear interval here
  setInterval(bulletMove, 100);

  //   function bulletStop(){
  //     if($('.shooter-fire').offset().top === $('.main-box').offset().top) {
  //       clearInterval(bulletMove);
  //     }
  // bulletStop();

  // function to move boxes from left to right
  function animateAliens(){

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
  }
  setInterval(animateAliens, 100)


  $game.on('click', function(){
    animateAliens();
    moveCharacter();
  });

  // function removeVisibility(alien){
  //   alien.css('display', 'none');
  // }
  // make collision detection between boxes and bullet

  function collisionDetectionBullet(){

    if(!shooterFireArray.length) return false;
    // console.log(shooterFireArray);
    for(let i = 0; i < shooterFireArray.length; i++){
      for(let j = 0; j < $gridArray.length; j++) {

        if((shooterFireArray[i].offset().left < ($gridArray[j].offset().left + $gridArray[j].width())) &&
        (shooterFireArray[i].offset().left > $gridArray[j].offset().left) &&
        (shooterFireArray[i].offset().top > $gridArray[j].offset().top) &&
        (shooterFireArray[i].offset().top < ($gridArray[j].offset().top + $gridArray[j].height()))) {
          shooterFireArray[i].remove();
          $gridArray[j].remove();
        }
      }
    }
  }
  setInterval(collisionDetectionBullet, 10);

  function animateAliensSpeed(){
    if($gridArray.length < 10){
      setInterval(animateAliens, 10);
    }
  }
  animateAliensSpeed();

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
        // $gridArray.length = 0;
        // $gridArray.remove();
      }
    }
  }
  setInterval(collisionDetectionGameCharacter, 10);

  // end document
  // console.log(shooterFireArray, $gridArray);
});
