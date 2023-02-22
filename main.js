import Particledata from "./particledata.js"
import WebGLRenderer from "./webgl_renderer.js"
import Pixels from "./pixels.js"

// CONFIG BITS

const get_color_from_image = true;
const random_positions = false;

// get HTML5 canvas
let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvas_rect = canvas.getBoundingClientRect();

// Prevent site from scrolling on phones
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

// Define mouse object to store cursor postition
// Initialize to off screen
const mouse = {
    x: -10000,
    y: -10000,
};

// Update mouse/touch position
function updateMousePosition(event) {
    let x, y;
    if (event.type == 'touchmove') {
        x = event.touches[0].clientX - canvas_rect.left;
        y = event.touches[0].clientY - canvas_rect.top;
    } else {
        x = event.clientX - canvas_rect.left;
        y = event.clientY - canvas_rect.top;
    }
    mouse.x = (x / canvas.width) * 2 - 1;
    mouse.y = (y / canvas.height) * 2 - 1;

    // Spawn particles if mouse button is held
}

window.addEventListener('mousemove', updateMousePosition);
window.addEventListener('touchmove', updateMousePosition);


// load sampling image
let image = new Pixels("./canyon.png", image_is_loaded)

// Image is now loaded
function image_is_loaded(){

    // Make n particles
    let particle_data = new Particledata();
    // let color_array = ["#db222a","#098d9b","#053c5e","#bc1055","#fa600c"];
    let color_array = [[0.859, 0.133, 0.165, 1.0], [0.035, 0.553, 0.608, 1.0],
                       [0.020, 0.235, 0.369, 1.0], [0.737, 0.063, 0.333, 1.0],
                       [0.980, 0.376, 0.047, 1.0]];

    if (random_positions) {
        for (let index = 0; index < 10000; index++) {
            
            // generate position based on image
            let x = Math.floor(Math.random() * image.pixels.length)
            let y = Math.floor(Math.random() * image.pixels[0].length)

            while (!get_color_from_image && Math.random() < average(image.pixels[x][y])) {
                x = Math.floor(Math.random() * image.pixels.length)
                y = Math.floor(Math.random() * image.pixels[0].length)
            }

            // Determine color randomly from set
            let color = color_array[Math.floor(Math.random() * color_array.length)];
            // Or from a source image
            if (get_color_from_image) {
                color = image.pixels[x][y];
            }

            // Add a small random offset
            y += Math.random() * -0.5;
            x += Math.random() * -0.5;

            // scale x and y values
            let pos = scale_x_y(x, y);

            //generating new particle in particle array

            particle_data.add_particle(pos, color);   
        }
    } else {
        for (let x = 0; x < image.pixels.length; x++) {
            for (let y = 0; y < image.pixels[0].length; y++) {
                // Determine color randomly from set
                let color = color_array[Math.floor(Math.random() * color_array.length)];
                // Or from a source image
                if (get_color_from_image) {
                    color = image.pixels[x][y];
                }

                // Add a small random offset
                //y += Math.random() * -0.5;
                //x += Math.random() * -0.5;

                // scale x and y values
                let pos = scale_x_y(x, y);

                //generating new particle in particle array

                particle_data.add_particle(pos, color);   
            }
            
        }
    }

    console.log(particle_data.nr);
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

function scale_x_y(x, y) {
    x = x / image.pixels.length * 2 - 1
    y = y / image.pixels[0].length * 2 - 1
    return [x, y]
}

function average(vector) {
    let total = 0;
    vector.forEach(element => {
        total += element;
    });
    return total / vector.length;
}

function spawn_particles() {

}