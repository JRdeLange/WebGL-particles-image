This project is live on https://jrdelange.github.io/WebGL-particles-image/


# General idea

This is a toy I built to get some grasp of Javascript and WebGL shaderlanguage. It renders an image made up of small particles. These particles then react to the mouse. The way they react can be altered by setting the sliders on the left of the frame. All transformations of the particles are done on the GPU to speed up processing massively. This means that roughly 20 times more particles can be used than if everything was done on the CPU.