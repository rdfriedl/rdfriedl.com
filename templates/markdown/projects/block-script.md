### Description
**Block-Script** is a 3D maze game built using [Three.js](/skills/view?id=threejs) for the 3D graphics, and [VueJS](/skills/view?id=vuejs) for the interface.

### story
**Block-Script was originally designed to be similar to Minecraft**, because at the time it seemed like a it would be a simple game to re-create.
though as I found out later, minecraft is not a simple game to recreate.
I started working on it and after about month or so I had the basic map generator and game play working.
though after a while I got board, and took a break so that I could work on some of my other projects.

**After about 4 months I started working on the game again**, and at the time I just finished learning ES6 and [webpack](/skills/view?id=webpack).
So I decided to rewrite the game to give myself a chance to apply what I had just learned to a working project.
I also took this chance to redesign the game to be more of a maze game instead of a Minecraft clone.
Another reason I wanted to change the games design, was because I had been studying maze generators and I wanted to try my hand at creating a 3D maze generator.

**The first step in rewriting the game** was to set up a build system that would allow me to use ES6 and [VueJS](/skills/view?id=vuejs)
After a little research i settled on using [Webpack](/skills/view?id=webpack) and [Babel](/skills/view?id=babel).
It did not take long before i had a working development environment setup, complete with a [HMR development server](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/).

<span class="pull-right margin-left-10-sm margin-bottom-10 width-100-xs width-25" style="position: relative">
    <i class="fa fa-play-circle overlay-icon overlay-icon-hide"></i>
    <video class="play-on-hover img-responsive" rate="2.5" loopPause="2" preload src="https://dl.dropboxusercontent.com/spa/ihqn7sv44ik7per/site-assets/games/block-script/block-script-editor.mp4"></video>
</span>
**The next step was to create a set of pre-built rooms** that would snap together to create the maze.
To do this I had to build my own 3D room editor that would allow me build and preview the rooms, before I added them to the game.

Then once I had all 28 of the rooms built for the maze, it was time to start working on the game itself.
For the controls and player movement I tried to copy Minecraft as much as possible, just to ensure that the game would feel normal to other players.

<a class="thumbnail pull-left margin-right-10-sm margin-bottom-10 width-100-xs width-25" href="https://dl.dropboxusercontent.com/spa/ihqn7sv44ik7per/site-assets/games/block-script/2016-11-12-19-35-09.png" target="_blank" data-image-modal>
	<img title="3d maze game" src="https://dl.dropboxusercontent.com/spa/ihqn7sv44ik7per/site-assets/games/block-script/2016-11-12-19-35-09_tn.jpg"/>
</a>
**Then after I had the player and the maze finished** I moved on to optimizing the game.
It originally ran at 30-40 FPS in most browsers, though after about two days of heavy optimization I got it to run at a steady 55-60 FPS.
A few of the things that had been slowing it down were the custom collision engine I had built, and the base class for the Blocks.

**And thats where the projects stands right now**, its in a working state though it far from done.
