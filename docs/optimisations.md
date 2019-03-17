# Optimisations

At this point in the program I have developed a working version of the program which meets all requirements. However, there are some improvements I feel I can go back and make now that I have completed one iteration of my agile development process.

I made the map pan to the side when the direction menu is open, to improve user flow, and had it move back when it was clicked again. to do this I had to move the toggleMenu() function because it needed to contain the map object. I moved this to the initMap() function where I added an event listener which would toggle the menu and pan the map at the same time. 