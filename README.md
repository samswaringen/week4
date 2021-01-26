# Random Pac-Man Game 
## Description 
* A game where you control the Pac-Man on the screen with the arrow keys and try and collect as many circles as possible without touching the ghost(s)!
* If you eat a colorful circle the sie of your pac-man grows and if you eat a black circle your size shrinks. 
* Every 60 seconds the screen will load a new set of circles and generate an additional ghost that moves randomly around the screen.
## Credits
* **MIT xPro Proffesional Certificate in Coding** provided the starting files for the pacman game and the NextTech assignment included in this repo .
* **www.w3schools.com** for providing me with definitions and usuage of all sorts of methods and functions.
* **www.stackoverflow.com** and Everyone who answers on there for being awesome!
## Roadmap
Currently I have the pacman controls working, the circles showing up on the screen and refreshing and the scoreboard display. I plan on updating this to completion  I have to work on getting the following to work.
### Things to do:
* I want to get the ghost to move randomly around the screan bounds like I did with he balls in my week3 assignments. If it impacts pacman you lose game. At each screen refresh add an additional ghost
* I want to get the pacman to eat the circles on the screen. Small colorful circles will inrease score and slightly increase size of pacman by 1px. Larger black circles will increase score but decrease size of pacman by 2px. 
### Problems to solve
I was trying to figure out how to remove all the circle **divs** because I wanted to refresh the number and position of the circles on the screen every 60 seconds but I couldn't.

So I instead refreshed the whole html document and I planned on having white box **divs** created behind the pacman to cover the circles. I was going to give the circles a more    structured layout having the dots position randomly selected from a large array of postions on the screen. Then I would create an empty array and have it be all the points on     the side of the pacman that matches the direction of the pacman as it moves and check that against the array of dots on the screen. If the check comes back true it would         increase the score and the white block **div** would cover the dot. Every 60 seconds when the screen refreshes it would delete the circles that were not collected and the white    boxes and then create an additional ghost.
## Contact
If you're feeling generous and want to help out
## DEMO
**https://samswaringen.github.io/week4/**

**Email**: samswaringen@gmail.com
