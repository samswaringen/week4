# week4
week4 assignments for MIT xPro class
It's still a work in progress!

Things to do:
I want to get the ghost to move randomly around the screan bounds like I did with he balls in my week3 assignments. If it impacts pacman you lose game.
I want to get the pacman to eat the circles on the screen. Small colorful circles will inrease score and slightly increase size of pacman by 1px.
Larger black circles will increase score but decrease size of pacman by 2px. 

I was trying to figure out how to remove all the circle <div>s because I wanted to refresh the number and position of the circles on the screen every 60 seconds but I couldn't.
  So I instead refreshed the whole html document and I planned on having white box <div>s created behind the pacman to cover the circles. I was going to give the circles a more     structured layout having the dots position randomly selected from a large array of postions on the screen. Then I would create an empty array and have it be all the points on     the side of   the pacman that matches the direction of the pacman as it moves and check that against the array of dots on the screen. If the check comes back true it would         increase the score   and the white block <div> would cover the dot. Every 60 seconds when the screen refreshes it would delete the circles that were not collected and the white   boxes and then create an additional ghost.
