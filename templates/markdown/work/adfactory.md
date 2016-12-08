AdFactory is a easy to use graphical ad designer for TeeSpring t-shirts campaigns

<!-- 
**After AdFactory had launched** i started developing a video rendering solution for AdFactory that would allow users to render videos in the browser.
It had to create `.mp4` video files out of a list of image slides with transitions.
It was hard but at the same time rewarding, because in the process of building it I learned a lot about JavaScript and web development in general.
After a lot of research i found a library called [ffmpeg.js](https://github.com/bgrins/videoconverter.js), which is ffmpeg converted into JavaScript using Emscripten.
Though i ran into a few problems when i tried to use it.

**The first problem was that the JavaScript file was `24.1 MB`**, which for a JavaScript file is massive.
To work around this i had to cache the whole script in a local database on the users browser so that i would not have to download the file every time they needed to render a video.

**Another problem with using FFmpeg.js** was that it would freeze and crash the browser when ever it ran.
This was a little harder to fix, but after doing a lot a research i found a technology called [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
They allow you to create a separate thread to run your JavaScript in.
I Found that if i ran FFmpeg.js in a WebWorker it would not freeze up the UI or crash the browser.

**Once i got the video renderer running smoothly**, i went on to create the interface to allow the user to edit the videos slides, and add animations.
 -->
