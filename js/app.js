$(()=>{
  const $gameCharacter = $('.shooter');
  const $boxes = $('.box');
  const shooterFireArray = [];
  const $mainBox = $('.main-box');
  const $box = $('.box');
  let direction = true;
  const $divWidth = $('.main-box').width();
  const $boxWidth = $('.box-group').width();
  // let marginBotton;
  let $characterPosition;
  // $bulletPosition declared but not used
  let $bulletPosition;

  // $('.shooter-fire').css('top', ($gameCharacter.offset().top + $('.shooter-fire').height())+ 'px');
  // console.log($boxes);

// when the gun fires, store the position of the gun in a variable. Use this position to guide the bullet.

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
  moveCharacter();


  $(document).on('keydown', function(e){
    if(e.which === 32){
      // marginBotton +=5;
      //creates bullet div
      const $bullet = $('<div />');
      $bullet.addClass('shooter-fire');
      $('.main-box').append($bullet);
      shooterFireArray.push($bullet);
      console.log(shooterFireArray);
      $characterPosition = $gameCharacter.offset().left;
    }
    initialBulletPosition();
  });

  // //set initial position of bullet, wherever character is at time
  function initialBulletPosition(){
    $('.shooter-fire').css('left', $characterPosition + 'px');
  }

  function bulletPath(){

  }

  // function to fire the bullet and keep it moving
  function bulletMove(){
    $('.shooter-fire').css('bottom','+=5px');
  }
  // need to add clear interval here
  setInterval(bulletMove, 100);

  // function to move boxes from left to right. Bottom isn't working
  function animateAliens(){

    setInterval(function(){
      if(direction){

        if($('.box-group').position().left + $boxWidth > ($('.main-box').offset().left + $divWidth)) direction = false;
        $('.box-group').css('left', '+=10px');
        $('.box-group').css('bottom', '-=1px');
      } else {
        if($('.box-group').position().left < ($('.main-box').offset().left + 8)) direction = true;
        // if($('.box-group').position().left < 0) direction = true;
        $('.box-group').css('left', '-=10px');
      }
    }, 100);
  }

  animateAliens();

  // make collision detection between boxes and bullet

  function collisionDetection(){

    if(!shooterFireArray.length) return false;
    // console.log(shooterFireArray);
    for(let i = 0; i < shooterFireArray.length; i++){
      $boxes.each(function() {

        // console.log($(this).offset());
        // console.log(shooterFireArray[i]);
        // console.log($boxes[i]);
        // for(let j = 0; j < $boxes.length; j++){
        // console.log($(this));

        // Loop through $('.shooter-fire')
        // then loop through $(.box)
        if((shooterFireArray[i].offset().left < $(this).offset().left) + ($(this).width()) &&
        (shooterFireArray[i].offset().left + shooterFireArray[i].width()) > ($(this).offset().left) &&
        (shooterFireArray[i].offset().top < $(this).offset().top) + ($(this).height()) &&
        (shooterFireArray[i].height() + shooterFireArray[i].offset().top) > ($(this).offset().top)) {
          console.log('hit');
        }
      });
    }
    // }
  }
  setInterval(collisionDetection, 1000);

});
