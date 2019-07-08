# JankyEarthDefense
[Live](https://elvis-yuan.github.io/JankyEarthDefense/)
## Overview

Janky Earth Defense is a survival game where users draw lines to defend Earth from meteors.
Reaction speeds and mouse accuracy will be put to the test.
As time goes by meteors will move faster and increase in number.
Resources are not unlimited so be wise with where you place your lines!
Scores are calculated based on survival time, the number of lines created and length of lines.

## Functionality

- Users can draw lines that persist on the game field
- Meteors are generated randomly and travel from the edge of the screen towards the middle
- Game will end when Earth is hit by 3 meteors
- Lines will disapear when meteors collide with them

## MVP

- Canvas renders assets
- Users can use mouse click and drag
- Meteors spawn randomly and travel towards the center
- Meteors and shields are removed when they collide
- Space bar pauses the game
- Game over screen displays score and replay button

## Wireframe

![](https://github.com/elvis-yuan/JankyEarthDefense/blob/master/assets/Wireframe.png)

The game will be one page with a rectangular canvas and links to the Github repo and LinkedIn.

## Technology

- Vanilla JavaScript for game logic
- HTML5 Canvas for rendering the game
- Webpack to bundle scripts
