AdFactory is a easy to use graphical ad designer for TeeSpring T-shirts campaigns

**When I joined the project, my main focus was** designing and implementing a drag-and-drop graphical editor into the application.
It had to allow the user to easily move, rotate, and scale elements on the canvas.
To accomplish this I used a library called [fabric.js](http://fabricjs.com/).
which provides a very nice foundation for building interactive drag-and-drop editors.

**After I had implemented the core drag-and-drop editor** I moved onto creating the element inspector.
The idea was, it would slide out from the right of the screen whenever the user selected something on the canvas.
And it would allow them to change things on the selected element like, text, color, stroke, and shadow.

**When the application was in a working state** we stared integrating it with TeeSprings API.
The first step was a bit tricky because we had to make sure the user was logged into TeeSpring before we could make any API requests.
All though after that it just a mater of requesting the data that we needed. And using that data in the application.

**Once the application was fully integrated** we started testing it with the help of beta testers from TeeSpring.
At first there were a lot of bugs. All though thanks to our quick response we were able to squash most all of them.
After only 4 months of testing we had all the bugs worked of the application.
And we were ready to move onto the most exciting part, launching the application

**The Launch was a great success with little to no bugs** thanks for our vigilant testing.

**After AdFactory had launched** I was tasked with developing an extension that would allow users to render videos in their browser.
It had to create `.mp4` video files out of a list of image slides with transitions.
It was hard but at the same time rewarding, because in the process of building it I learned a lot about JavaScript and web development in general.
After a lot of research I found a library called [ffmpeg.js](https://github.com/bgrins/videoconverter.js), which is ffmpeg converted into JavaScript using Emscripten.
Though I ran into a few problems when implementing it.

**The first problem was that the JavaScript file was `24.1 MB`** which for a JavaScript file is massive.
To work around this I had to cache the whole script in a local database on the users browser.
This way it would not have to be downloaded every time the user needed to render a video.

**Another problem with using FFmpeg.js** was that it would freeze and crash the browser whenever it ran.
This was a little harder to fix, but after doing a lot a research I found a technology called [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
In the simplest form they allowed you to create a separate thread to run JavaScript in.
I Found that if I ran FFmpeg.js in a WebWorker it would not freeze up the UI or crash the browser.
All though it would still take just as long to process the video.

**Once I got the video renderer running smoothly**.
I went on to create the interface that would allow the user to edit the videos slides, and add transitions.
This proved to be a little bit tricky because i had to make it fit into the applications existing interface.
All though after a lot of work and some CSS magic. I successfully 

**Once the extension was launched**, AdFactory became the first online application to feature a browser based video rendering solution.
Other applications where still using slower server-side rendering solutions.
