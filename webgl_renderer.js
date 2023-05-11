import { dynamic_vertex_source, fragment_source, old_vertex_source } from "./shaders.js"
import RenderVars from "./rendervars.js";

export default class WebGLRenderer{

    constructor(canvas, particle_data, mouse) {
        this.particle_data = particle_data;
        this.gl = canvas.getContext("experimental-webgl");
        this.mouse = mouse;

        this.render_vars = new RenderVars();

        this.date = new Date();

        this.shader_program = this.gl.createProgram();
        this.make_shaders();

        this.position_buffer = this.gl.createBuffer();
        this.color_buffer = this.gl.createBuffer();
        this.random_nr_buffer = this.gl.createBuffer();

        this.pos_attribute = null;
        this.color_attribute = null;
        this.random_nr_attribute = null;
        this.get_attribute_locations();

        this.time_uniform = null;
        this.mouse_uniform = null;
        this.test = null;
        this.get_uniform_locations();

        this.fill_buffers();

        this.gl.enable(this.gl.DEPTH_TEST);
        this.prevtime = 0;
    }

    draw(time) {
        this.set_uniforms(time);
        
        // this.print_framerate(time);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.position_buffer);
        this.gl.drawArrays(this.gl.POINTS, 0, this.particle_data.nr);
    }

    print_framerate(time) {
        console.log(1000 / (time - this.prevtime));
        this.prevtime = time;
    }

    clear() {
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    fill_buffers() {
        this.fill_position_buffer();
        this.fill_color_buffer();
        this.fill_random_nr_buffer();
    }

    fill_position_buffer() {
        let data = this.particle_data.positions;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.position_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    }

    fill_color_buffer() {
        let data = this.particle_data.colors;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    }

    fill_random_nr_buffer() {
        let data = this.particle_data.random_nrs;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.random_nr_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    }

    get_attribute_locations() {
        // Position attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.position_buffer);
        this.pos_attribute = this.gl.getAttribLocation(this.shader_program, "position");
        this.gl.vertexAttribPointer(this.pos_attribute, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.pos_attribute);

        // Color attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.color_attribute = this.gl.getAttribLocation(this.shader_program, "color");
        this.gl.vertexAttribPointer(this.color_attribute, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.color_attribute);

        // Random nrs attribute
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.random_nr_buffer);
        this.random_nr_attribute = this.gl.getAttribLocation(this.shader_program, "random_nrs");
        this.gl.vertexAttribPointer(this.random_nr_attribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.random_nr_attribute);
    }

    set_uniforms(time) {
        // Invert y to correct mouse position
        let mouse_array = new Float32Array([this.mouse.x, -this.mouse.y]);
        this.gl.uniform2fv(this.mouse_uniform, mouse_array);
        time = time / 1000;
        this.gl.uniform1f(this.time_uniform, time);

        this.gl.uniform1f(this.test, this.render_vars.react_distance); 
        this.gl.uniform1f(this.render_vars.size_uniform, this.render_vars.size); 
        this.gl.uniform1f(this.render_vars.magnification_uniform, this.render_vars.magnification); 

        this.gl.uniform1f(this.render_vars.waves_amplitude_uniform, this.render_vars.waves_amplitude); 
        this.gl.uniform1f(this.render_vars.waves_amplitude_variation_uniform, this.render_vars.waves_amplitude_variation); 
        this.gl.uniform1f(this.render_vars.waves_frequency_uniform, this.render_vars.waves_frequency); 
        this.gl.uniform1f(this.render_vars.waves_speed_uniform, this.render_vars.waves_speed); 

        this.gl.uniform1f(this.render_vars.rippling_amplitude_uniform, this.render_vars.rippling_amplitude); 
        this.gl.uniform1f(this.render_vars.rippling_amplitude_variation_uniform, this.render_vars.rippling_amplitude_variation); 
        this.gl.uniform1f(this.render_vars.rippling_frequency_uniform, this.render_vars.rippling_frequency); 
        this.gl.uniform1f(this.render_vars.rippling_speed_uniform, this.render_vars.rippling_speed); 

        this.gl.uniform1f(this.render_vars.pulsation_amplitude_uniform, this.render_vars.pulsation_amplitude); 
        this.gl.uniform1f(this.render_vars.pulsation_frequency_uniform, this.render_vars.pulsation_frequency); 
        this.gl.uniform1f(this.render_vars.pulsation_speed_uniform, this.render_vars.pulsation_speed); 

        this.gl.uniform1f(this.render_vars.repel_distance_uniform, this.render_vars.repel_distance); 
        this.gl.uniform1f(this.render_vars.repel_variance_uniform, this.render_vars.repel_variance); 

        
    }

    get_uniform_locations() {
        this.time_uniform = this.gl.getUniformLocation(this.shader_program, "time");
        this.mouse_uniform = this.gl.getUniformLocation(this.shader_program, "mouse");
        
        this.test = this.gl.getUniformLocation(this.shader_program, "react_distance"); 
        this.render_vars.size_uniform = this.gl.getUniformLocation(this.shader_program, "size"); 
        this.render_vars.magnification_uniform = this.gl.getUniformLocation(this.shader_program, "magnification"); 

        this.render_vars.waves_amplitude_uniform = this.gl.getUniformLocation(this.shader_program, "waves_amplitude"); 
        this.render_vars.waves_amplitude_variation_uniform = this.gl.getUniformLocation(this.shader_program, "waves_amplitude_variation"); 
        this.render_vars.waves_frequency_uniform = this.gl.getUniformLocation(this.shader_program, "waves_frequency"); 
        this.render_vars.waves_speed_uniform = this.gl.getUniformLocation(this.shader_program, "waves_speed"); 

        this.render_vars.rippling_amplitude_uniform = this.gl.getUniformLocation(this.shader_program, "rippling_amplitude"); 
        this.render_vars.rippling_amplitude_variation_uniform = this.gl.getUniformLocation(this.shader_program, "rippling_amplitude_variation"); 
        this.render_vars.rippling_frequency_uniform = this.gl.getUniformLocation(this.shader_program, "rippling_frequency"); 
        this.render_vars.rippling_speed_uniform = this.gl.getUniformLocation(this.shader_program, "rippling_speed"); 

        this.render_vars.pulsation_amplitude_uniform = this.gl.getUniformLocation(this.shader_program, "pulsation_amplitude"); 
        this.render_vars.pulsation_frequency_uniform = this.gl.getUniformLocation(this.shader_program, "pulsation_frequency"); 
        this.render_vars.pulsation_speed_uniform = this.gl.getUniformLocation(this.shader_program, "pulsation_speed"); 

        this.render_vars.repel_distance_uniform = this.gl.getUniformLocation(this.shader_program, "repel_distance"); 
        this.render_vars.repel_variance_uniform = this.gl.getUniformLocation(this.shader_program, "repel_variance"); 
    }

    make_shaders() {
        let fragment = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        let vertex = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(fragment, fragment_source);
        this.gl.compileShader(fragment);
        this.gl.shaderSource(vertex, dynamic_vertex_source);
        this.gl.compileShader(vertex);
        this.gl.attachShader(this.shader_program, vertex);
        this.gl.attachShader(this.shader_program, fragment);
        this.gl.linkProgram(this.shader_program);
        this.gl.useProgram(this.shader_program);
    }
}