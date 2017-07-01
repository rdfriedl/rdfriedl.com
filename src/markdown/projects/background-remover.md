### Description
A simple proof of concept application I built to test my ideas on different image processing algorithms.

### The Algorithm
The Algorithm itself is very similar to the [Flood Fill](https://en.wikipedia.org/wiki/Flood_fill) algorithm.
In fact it might as well just be a modified version of it.

**If you dont know what the [Flood Fill](https://en.wikipedia.org/wiki/Flood_fill) algorithm is** then i recommend looking it up before reading further.

**One of the first differences** is that before a pixel can spread to one of its neighbor pixels, it has to make sure that its neighbors color is relatively similar to its own color.
It dose this by testing the 4 dimensional distance between the colors, `X = red, Y = green, Z = blue, W = alpha`.
If the distance is greater than the maximum climb distance then the color cant spread to the neighboring pixel.
If its less then the maximum, then it spreads to the neighbor pixel and then tries to spread from there to more pixels.

**The reason for using the 4 dimensional distance to test the difference between colors** is because if you use the RGBA average of color two colors there is a chance that they could be equal even though the colors are not the same.
Im going to forget about the alpha channel for the purpose of the example.
So if you take the RGB average of red `(255 + 0 + 0)/3 = 85` you get 85, which is the same as the RGB average of blue `(0 + 0 + 255)/3 = 85`.
This is a problem, they are tow completely different colors but the RGB averages are the same.

**The solution, use the 3D distance between the colors**
If you think of the colors as a point in 3D space, then red `x = 255, y = 0, z = 0` is on the far end of the X axis, and blue `x = 0, y = 0, z = 255` is centered on the Z axis.
Now the difference between the colors is the 3D distance between the points, which means that the greater the distance the more difference in the color of the pixel.
Then to handle the alpha channel in the pixels we would just add another dimension.

**This is in no way perfect**, and im sure there are much better solutions.
But for my purposes it works well, and is much more reliable then getting the RGBA average of the pixels.

**Then once there are no more pixels that can spread**, it starts a new step.
Every step it increases the maximum climb, this allows the pixels to spread the pixels that have a greater color difference.

**The end result makes the color spread across the image like water.**
It flows around areas that have hard lines in them and likes to spread across the areas that have similar colors.

**But thats still not going to allow it to find the background of the image.**
To do that it has to use multiple colors, and alternate between them.
This way, at the end of every step each color has spread as much as it can without spreading into the other color.

**The result is similar to pouring water into a pan with bumps and ridges.**
As the pan fills up, and as it slowly spreads it tends to fill up the flat areas first, and then later spreads over the bumps and ridges.

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
This way when algorithm got to a cell group it could spread over large chunks of the image in a matter of milliseconds.

**Unfortunately I have yet to implement the pixel grouping into the algorithm**, at the time I had other more important projects to work on.
And since then I never really got the time to work on it again.

**In the future** I'm considering creating a small library out of the algorithm.
Though that would require me to clean up the code, add the pixel grouping, and make it able to run in a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).
But until then, its all just an idea in my head.
