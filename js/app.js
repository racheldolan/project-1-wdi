$(()=>{
  const rows = 9, cols = 5;
  const $gameCharacter = $('.shooter');
  // const $boxes = $('.box');
  const shooterFireArray = [];
  const gridArray = [];
  const $mainBox = $('.main-box');
  const $box = $('.box-group');
  // const $box = $('.box');
  let direction = true;
  const $divWidth = $('.main-box').width();
  const $boxWidth = $('.box-group').width();
  const audio = document.querySelector('audio');
  // let marginBotton;
  const $characterPosition = [];
  const $button = $('button');
  const $game = $('.game');

// function to make the instructions disappear
  $game.on('click', function(){
    if($('.game').css('display', 'block')){
      $('.game').css('display', 'none');
    } else {
      $('.game').css('display', 'block');
    }
  })


  // $('.shooter-fire').css('top', ($gameCharacter.offset().top + $('.shooter-fire').height())+ 'px');
  // console.log($boxes);

  // Generate grid of divs
  for (let i = 0; i < rows; i++) {
    const $newDiv = $('<div>');
    $newDiv.addClass('rows');
    $('.box-group').append($newDiv);
    gridArray.push($newDiv);
    for (let j = 0; j < cols; j++) {
      const $newDiv2 = $('<div>');
      $newDiv2.addClass('cols');
      $newDiv.append($newDiv2);
      gridArray.push($newDiv2);
      // console.log(gridArray);
    }
  }

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
      audio.play();
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

  // function to move boxes from left to right
  function animateAliens(){
    setInterval(function(){
      if(direction){
        if($('.box-group').position().left + $boxWidth > $divWidth) direction = false;
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

$game.on('click', function(){
  animateAliens();
  moveCharacter();
})
  // animateAliens();

  // make collision detection between boxes and bullet

  // function collisionDetectionBullet(){
  //
  //   if(!shooterFireArray.length) return false;
  //   // console.log(shooterFireArray);
  //   for(let i = 0; i < shooterFireArray.length; i++){
  //     for(let j = 0; j < gridArray.length; j++) {
  //     // $('.rows').each(function() {
  //       // console.log($(this).offset());
  //       // console.log(shooterFireArray[i]);
  //       // console.log($boxes[i]);
  //       // for(let j = 0; j < $boxes.length; j++){
  //       // console.log($(this));
  //
  //       // Loop through $('.shooter-fire')
  //       // then loop through $(.box)
  //       if((shooterFireArray[i].offset().left < gridArray[j].offset().left) + (gridArray[j].width()) &&
  //       (shooterFireArray[i].offset().left + shooterFireArray[i].width()) > (gridArray[j].offset().left) &&
  //       (shooterFireArray[i].offset().top < gridArray[j].offset().top) + (gridArray[j].height()) &&
  //       (shooterFireArray[i].height() + shooterFireArray[i].offset().top) > (gridArray[j].offset().top)) {
  //         console.log('hit');
  //         // gridArray[j].remove();
  //       }
  //     };
  //   }
  // }

    // for(let j = 0; j < shooterFireArray.length; j++){
    //   $('.cols').each(function() {
    //     // console.log($(this).offset());
    //     // console.log(shooterFireArray[i]);
    //     // console.log($boxes[i]);
    //     // for(let j = 0; j < $boxes.length; j++){
    //     // console.log($(this));
    //
    //     // Loop through $('.shooter-fire')
    //     // then loop through $(.box)
    //     if((shooterFireArray[j].offset().left < $(this).offset().left) + ($(this).width()) &&
    //     (shooterFireArray[j].offset().left + shooterFireArray[j].width()) > ($(this).offset().left) &&
    //     (shooterFireArray[j].offset().top < $(this).offset().top) + ($(this).height()) &&
    //     (shooterFireArray[j].height() + shooterFireArray[j].offset().top) > ($(this).offset().top)) {
    //       console.log('hit');
    //     }
    //   });
    // }
    // }
  // // })
  // setInterval(collisionDetectionBullet, 1000);
//
//
// // function to check collision between boxes and main character
  function collisionDetectionGameCharacter(){

    if(($gameCharacter.offset().left < $box.offset().left) + ($box.width()) &&
  ($gameCharacter.offset().left + $gameCharacter.width()) > ($box.offset().left) &&
  ($gameCharacter.offset().top < $box.offset().top) + ($box.height()) &&
  ($gameCharacter.height() + $gameCharacter.offset().top) > ($box.offset().top)) {
      console.log('game over');
    // gridArray[j].remove();
    }
  };

  setInterval(collisionDetectionGameCharacter, 1000);

  // end document
});
