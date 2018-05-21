$(()=>{
  const $gameCharacter = $('.shooter');
  const $boxes = $('.box');
  const shooterFireArray = [];
  const $mainBox = $('.main-box');
  const $box = $('.box');

  // console.log($boxes);

  // $boxes.each(function(index, obj) {
  //   console.log('div' + index + ':' + $(this).attr('class'));
  // });

  // iterates through the boxes array
  // $('.box').each(function(index, obj) {
  //   console.log('div' + index + ':' + $(this).attr('class'));
  // });


  // moves character left and right
  function moveCharacter(){
    $(document).on('keydown', function(e){
      switch(e.which){
        case 39:
        // console.log('right');
        $gameCharacter.css('left', '+=25px');
        break;
        case 37:
        // console.log('left');
        $gameCharacter.css('left', '-=25px');
        break;
      }
    });
  }
  moveCharacter();


  $(document).on('keydown', function(e){
    if(e.which === 32){
      //creates bullet div
      const $bullet = $('<div />');
      $bullet.addClass('shooter-fire');
      $('.main-box').append($bullet);
      shooterFireArray.push($bullet);
      console.log(shooterFireArray);
      //need to set initial position of bullet, wherever character is at time
    }
  });

  // function to fire the bullet and keep it moving
  function bulletMove(){
    $('.shooter-fire').css('bottom','+=5px');
  }

  setInterval(bulletMove, 100);
  //
  //   function collisionDetection(){
  //
  //     let $bulletOffset = $('.shooter-fire').offset();
  //     let $boxOffset = $box.offset();
  //
  //
  //
  //   if($bulletOffset.left < $boxOffset.left + $boxOffset.width() &&
  //   $bulletOffset.left + $bulletOffset.width() > $boxOffset.left &&
  //   $bulletOffset.top < $boxOffset.top + $boxOffset.height() &&
  //   $bulletOffset.height() + $bulletOffset.top > $boxOffset.top) {
  //     console.log('hit');
  //   }
  //   else{
  //     console.log('no hit');
  //   }
  //   setInterval(collisionDetection, 1000);
  // }
  // loop through each box in the boxes array
  //   function collisionDetection(){
  //     for (let i = 0; i < $boxes.length; i++) {
  //
  //       let $boxOffset = $boxes[i].offset();
  //       let $bulletOffset = $('.shooter-fire').offset();
  //
  //       if($bulletOffset.left < $boxOffset.left + $boxOffset.width() &&
  //       $bulletOffset.left + $bulletOffset.width() > $boxOffset.left &&
  //       $bulletOffset.top < $boxOffset.top + $boxOffset.height() &&
  //       $bulletOffset.height() + $bulletOffset.top > $boxOffset.top) {
  //         console.log('hit');
  //       }
  //       else {
  //         console.log('no hit');
  //       }
  //     }
  //   }
  //
  // setInterval(collisionDetection, 1000);

  // function to move boxes from left to right. Bottom isn't working
  function animateAliens(){
    let direction = true;
    const $divWidth = $('.main-box').width();
    const $boxWidth = $('.box-group').width();
    setInterval(function(){
      if(direction){
        if($('.box-group').position().left + $boxWidth > $divWidth) direction = false;
        $('.box-group').css('left', '+=10px');
        $('.box-group').css('bottom', '-=1px');
      } else {
        if($('.box-group').position().left < 0) direction = true;
        $('.box-group').css('left', '-=10px');
      }
    }, 100);
  }

  animateAliens()

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

  // make the main object shoot

  // make collision detection between shooting and aliens

  // hide aliens upon collision using jquery

  // increase score if aliens collide with main object

  // game over if aliens collide with main object

  // make the aliens shoot down

  // // make collision detection between shooting and main object

  // .remove will remove each alien from the dom

  // every time the interval runs check the collision

  // function that detects collision on every
});
