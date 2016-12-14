### Description
A simple proof of concept application I built to test my ideas on different image processing algorithms.

### The Algorithm
The Algorithm itself is very similar to the [Flood Fill](https://en.wikipedia.org/wiki/Flood_fill) algorithm.
In fact it might as well just be a modified version of it.

**It starts by taking all the pixels in the lines the user drew over the image**, and adds then into an array based on what color they are.
Then it loops over each array of colored pixels and checks the pixels neighbor to see if any of them are available, if so it adds them to the array.
By doing this the color slowly spreads over the image.
It also alternates between each color to ensure that they spread equally.

### Story
At first the algorithm was just a concept that I like to think about when I was board. Although after a while I started to take more interest in it.
After about three weeks of screwing around with the idea in my head, I decided to use some of my free time to test my ideas out and see if they would really work.

**It took me a little over a day to build it**, all though the result was very satisfying.
Contrary to what I expected it was actually really good at removing the background of images, provided they where not blurry.

**Its only drawback was** that if the user uploaded an image larger then `1024x768`, it would run very slow and sometime freeze the browser.
To fix this problem I was considering three possible solutions.
 - To reduce the size of the image when the user uploaded it.
 - Or to use [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) so that when it did process the image, it would not freeze the browser.
 - Or Lastly to find patches of pixels with similar color and group them together.

The last option was the hardest, though it would provide the fastest and most reliable performance.

**Since I had to intension of cutting corners on this experiment**, I decided to go with the most promising yet hardest solution.
So I started working on a smaller algorithm that would allow the me to find groups of pixels.
It took me a few tries, but what I came up with worked out really well. you can find it here [rdfriedl.com/pens/view?id=QNgvYo](http://www.rdfriedl.com/pens/view?id=QNgvYo).

**It finds groups of similar colored pixels** by placing a cell over the whole image.
then if there was over a certain amount of color variation in the cell, the cell will fractalize into 4 smaller cells.
It repeats this process till there are no more cells that can fractalize.

**Then the cells that did not fractalize** would be used as groups of pixels.
This way when algorithm got to a cell it could spread over large chunks of the image in a matter of milliseconds.

**Unfortunately I have yet to implement the pixel grouping into the algorithm**, at the time I had other more important projects to work on.
And since then I never really got the time to work on it again.

**In the future** I'm considering creating a small library out of the algorithm.
Though would require me to clean up the code, add the pixel grouping, and make it able to run in a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
But until then, its all just an idea in my head.
