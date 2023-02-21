import Particledata from "http://localhost:5500/Hardware particles/particledata.js"
import WebGLRenderer from "http://localhost:5500/Hardware particles/webgl_renderer.js"
import Mover from "http://localhost:5500/Hardware particles/mover.js"
import Pixels from "http://localhost:5500/Hardware particles/pixels.js"


// get HTML5 canvas
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas_rect = canvas.getBoundingClientRect();

//Define mouse object to store cursor postition
const mouse = {
    x: 0,
    y: 0,
};

// Update mouse position
window.addEventListener('mousemove', function(event) {
    let x = event.x - canvas_rect.left;
    let y = event.y - canvas_rect.top;
    mouse.x = (x / canvas.width) * 2 - 1;
    mouse.y = (y / canvas.height) * 2 - 1;
});


// load sampling image
let image = new Pixels("http://localhost:5500/Moving particles/test.png", image_is_loaded)

// Image is now loaded
function image_is_loaded(){

    // Make n particles
    let particle_data = new Particledata();
    // let color_array = ["#db222a","#098d9b","#053c5e","#bc1055","#fa600c"];
    let color_array = [[0.859, 0.133, 0.165, 1.0], [0.035, 0.553, 0.608, 1.0],
                       [0.020, 0.235, 0.369, 1.0], [0.737, 0.063, 0.333, 1.0],
                       [0.980, 0.376, 0.047, 1.0]];

    for (let index = 0; index < 100000; index++) {
        // generate position based on image
        let x = Math.floor(Math.random() * image.pixels.length)
        let y = Math.floor(Math.random() * image.pixels[0].length)

        while (Math.random() < image.pixels[x][y]) {
            x = Math.floor(Math.random() * image.pixels.length)
            y = Math.floor(Math.random() * image.pixels[0].length)
        }

        // Add a small random offset
        x += Math.random() - 5
        y += Math.random() - 5

        // scale x and y values
        x = x / image.pixels.length * 2 - 1
        y = y / image.pixels[0].length * 2 - 1
            
        //generating random values for particle properties
        let random_color = Math.floor(Math.random() * color_array.length);

        //generating new particle in particle array

        particle_data.add_particle([x, y], color_array[random_color])      
    }

    // Draw particles
    let renderer = new WebGLRenderer(canvas, particle_data, mouse);

    window.requestAnimationFrame(draw);

    function draw(time) {
        // particle_data.grow()
        renderer.clear()
        renderer.draw(time)
        window.requestAnimationFrame(draw)
    }
}