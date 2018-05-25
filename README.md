# project-1-wdi - Space Invaders

# Project Description

We had one week to build an in-browser game using HTML, CSS, Javascript & JQuery. I built a version of the retro arcade game Space Invaders.

# Game Description

<p align="center"><img src='https://github.com/racheldolan/project-1-wdi/blob/master/images/space-invaders-readme-screenshots/space-invaders-pre-game-start.gif'></p>

###### The game uses the left and right arrows to move the character along the bottom of the screen within the main box and the spacebar to shoot at incoming alien enemy.

<p align="center"><img src='https://github.com/racheldolan/project-1-wdi/blob/master/images/space-invaders-readme-screenshots/space-invaders-full-game-game-over.gif'></p>

###### As your score increases based on the number of enemy killed, the speed of the grid of aliens increases.

<p align="center"><img src='https://github.com/racheldolan/project-1-wdi/blob/master/images/space-invaders-readme-screenshots/Space-Invaders-game-won.gif'></p>

The build

I wanted to get the movement of the aliens and the main character to begin with and build on it from there.

I'd have liked to have added more elements to the game if i'd have had time. In the future I want to make the enemy aliens able to shoot back and be able to kill the main character after a certain amount of collisions which slowly reduce its health.

I'd also like to include barriers between the character and the aliens so that the main character can hide behind them but they also inhibit its ability to shoot.

The grid of aliens move quicker as time goes on, and I'd like to stretch this across different levels - not only will the aliens get faster, but they fire bullets more frequently.

The game isn't mobile responsive, so I'd also like to re-visit it to optimise for different screen sizes.

If I were to start the project again I would've begun with creating the alien grids dynamically using Javascript rather than building them in HTML first. My thinking was to get the movement of the grid working first before coming back and refactoring to make the code more DRY. However, I should have been refactoring as i went through, as generating the grid after perfecting the movement meant recalculating the movement of the grid which was time consuming.

I'd say my biggest victories were getting collision detection working, and enabling the character to fire bullets from its current position that were not then bound to following the character's path.

My biggest challenge was getting to grips with intervals. In order to increase the speed of the alien grid, I had to decrease the interval. I initially thought I could override the interval I'd created, but instead I was creating new ones which left me unable to clear the original interval, which meant the grid wouldn't stop. 
