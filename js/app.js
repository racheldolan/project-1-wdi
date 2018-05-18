$(()=>{
  const $shooter = $('.shooter');
  const $boxes = $('.box').toArray();

  console.log($boxes);

  // $boxes.each(function(index, obj) {
  //   console.log('div' + index + ':' + $(this).attr('class'));
  // });

// iterates through the boxes array
  $('.box').each(function(index, obj) {
    console.log('div' + index + ':' + $(this).attr('class'));
  });




// make a box in which the game will take place and a panel on the right for future scores

// make an array of all of the box divs


// create an object that sits at the bottom of the box, in the middle by default

// enable the object with jquery

// Use jquery css to write a function to select the object and enable it to move
// left and right but not up and down - do this using a switch statement
function moveShooter(){
  $(document).on('keydown', function(e){
    switch(e.which){
      // case 38:
      // console.log('up');
      // $shooter.css('top', '-=25px')
      // break;
      case 39:
      console.log('right');;
      $shooter.css('left', '+=25px')
      break;
      // case 40:
      // console.log('down');;
      // $shooter.css('top', '+=25px')
      // break;
      case 37:
      console.log('left');
      $shooter.css('left', '-=25px')
      break;
    }
  });
}

moveShooter();

// set the speed at which it can move

// make a grid of aliens that sit in the middle of the box. 5 x 11 images.

// make the main object shoot

// make the aliens move from left to right and down a row each time.

// make collision detection between aliens and main object

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
})
