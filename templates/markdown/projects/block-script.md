### Description
**Block-Script** is a 3D maze game built using [Three.js](/skills/view?id=threejs) for the 3D graphics, and [VueJS](/skills/view?id=vue) for the interface.

### story
I had originally designed Block-Script to be similar to Minecraft, because thats how all voxel games have to be apparently.
I worked on it for a month or so and then took a break to go work on other side projects.

After a while i started working on the game again, and at the time i just finished learning ES6 and [webpack](/skills/view?id=webpack).
So i decided to rewrite the game to give myself a change to apply what i had learned to a working project.
I also took the chance to change the games design to be a maze game instead of a Minecraft clone, because there are to many Minecraft clones.
I had also been studying maze generators, so this was also a great chance to try my hand at creating a 3D maze generator.

One of the first steps in redesigning the game was to create a set of pre-built rooms that would snap together to create the maze;
To do this i had to build my own 3D room editor that would allow me build and preview the rooms, before i added them to the game.

Then once i had all 28 of the rooms built for the maze it was time to start working on the game itself.
For the controls and player movement i tried to copy Minecraft as much as possible, just to ensure that the game would feel normal to other players.

Then after i had the player and the maze finished i moved on to optimizing the game.
It originally ran at 30-40 FPS in most browsers, though after about two days of heavy optimization i got it to run at a steady 55-60 FPS.
A few of the things that had been slowing it down were the custom collision engine i had built, and the base class for the Blocks.

And thats where the projects stands right now, its in a working state though it far from done.
