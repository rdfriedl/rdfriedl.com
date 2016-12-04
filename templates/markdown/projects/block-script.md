### Description
**Block-Script** is a 3D maze game built using [Three.js](/skills/view?id=threejs) for the 3D graphics, and [VueJS](/skills/view?id=vue) for the interface.

### story
I had originally designed it to be similar to minecraft, because thats how all voxel games have to be apparently.
I worked on it for a month or so and then took a break to go work on other side projects.

Once i finally got back to working on it i decided i needed to rewrite the whole thing in ES6 and [webpack](/skills/view?id=webpack) because i just finished learning that.
I also took the chance to change the games design to be a maze game since there are to many minecraft clones.

I had also been studying maze generators, so this was also a great chance to try my hand at creating a 3D maze generator.

One of the first steps in redesigning the game was to create a set of pre-built rooms that would snap together to create the maze;
To do this i had to build my own 3D room editor that would allow me build and preview the rooms, before i added them to the game.

Then once i had all 28 of the rooms built for the maze it was time to start working on the game itself.
For the controls and player movement i tried to copy minecraft as much as possible, just to ensure that the game would feel normal to other players.
