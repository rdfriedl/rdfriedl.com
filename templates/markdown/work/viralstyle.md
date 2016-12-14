The project started when ViralStyle contracted with WowSpring to create a online ad designer for their customers.
It was designed to be embedded into their website

**I was the one of the first developers on the project**, and as such it was my responsibility to get the project configured and setup.
The development environment for the project had to support ES6 along with [knockout.js components](http://knockoutjs.com/documentation/component-overview.html).
It also had the ability to easily split the JavaScript up into modules, and separate files.
And the final requirement was that the project had to run fine in the browser even when it was not compiled.

**This was somewhat complex to set up** but after some research i found something called [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) *(Asynchronous Module Definition)*.
It's a way of defining JavaScript modules, that allows you to define and load a modules dependencies before the module is executed.
I also found a AMD library called [System.js](https://github.com/systemjs/systemjs) that had a compiler with it [System.js builder](https://github.com/systemjs/builder).
I connected all the tools together using [Gulp](http://gulpjs.com/), which is a simple JavaScript task runner.

**The result was a project that could be compiled down to one JavaScript file**.
But would also run fine in the browser when it was not compiled.

**Once I had everything configured** we started work on the application itself.
It did not take us long at all to get a working prototype running since we where using [knockout.js](http://knockoutjs.com/index.html) for the interface.
Once we had the interface set up. I started working on the drag-and-drop graphical editor that would be the core of the application.
I used the same library [fabric.js](http://fabricjs.com/), that we had used for [AdFactory](http://127.0.0.1:8080/work/view?id=ad-factory).
Doing this allowed me to reuse a lot of code from AdFactory. Which in turn made the development process that much faster.
