export default class RenderVars{

    constructor(){
        this.react_distance_uniform = null;
        this.size_uniform = null;
        this.magnification_uniform = null;

        this.waves_amplitude_uniform = null;
        this.waves_amplitude_variation_uniform = null;
        this.waves_frequency_uniform = null;
        this.waves_speed_uniform = null;

        this.rippling_amplitude_uniform = null;
        this.rippling_amplitude_variation_uniform = null;
        this.rippling_frequency_uniform = null;
        this.rippling_speed_uniform = null;

        this.pulsation_amplitude_uniform = null;
        this.pulsation_frequency_uniform = null;
        this.pulsation_speed_uniform = null;

        this.repel_distance_uniform = null;
        this.repel_variance_uniform = null;


        this.react_distance = 1.0;
        this.size = 4.0;
        this.magnification = 0.0;

        this.waves_amplitude = 0.3;
        this.waves_amplitude_variation = 0.02;
        this.waves_frequency = 15.0;
        this.waves_speed = 2.5;

        this.rippling_amplitude = 0.0;
        this.rippling_amplitude_variation = 0.02;
        this.rippling_frequency = 25.0;
        this.rippling_speed = 3.5;

        this.pulsation_amplitude = 0.0;
        this.pulsation_frequency = 15.0;
        this.pulsation_speed = 2.0;

        this.repel_distance = 0.0;
        this.repel_variance = 0.02;


        this.react_distance_slider = document.getElementById("react_distance");
        this.react_distance_slider.oninput = (event) => {
            this.react_distance = parseFloat(event.target.value);
        }
        this.size_slider = document.getElementById("size");
        this.size_slider.oninput = (event) => {
            this.size = parseFloat(event.target.value);
        }
        this.magnification_slider = document.getElementById("magnification");
        this.magnification_slider.oninput = (event) => {
            this.magnification = parseFloat(event.target.value);
        }

        this.waves_amplitude_slider = document.getElementById("waves_amplitude");
        this.waves_amplitude_slider.oninput = (event) => {
            this.waves_amplitude = parseFloat(event.target.value);
        }
        //this.waves_amplitude_variation_slider = document.getElementById("waves_amplitude_variation");
        //this.waves_amplitude_variation_slider.oninput = (event) => {
        //    this.waves_amplitude_variation = parseFloat(event.target.value);
        //}
        this.waves_frequency_slider = document.getElementById("waves_frequency");
        this.waves_frequency_slider.oninput = (event) => {
            this.waves_frequency = parseFloat(event.target.value);
        }
        this.waves_speed_slider = document.getElementById("waves_speed");
        this.waves_speed_slider.oninput = (event) => {
            this.waves_speed = parseFloat(event.target.value);
        }

        this.rippling_amplitude_slider = document.getElementById("rippling_amplitude");
        this.rippling_amplitude_slider.oninput = (event) => {
            this.rippling_amplitude = parseFloat(event.target.value);
        }
        //this.rippling_amplitude_variation_slider = document.getElementById("rippling_amplitude_variation");
        //this.rippling_amplitude_variation_slider.oninput = (event) => {
        //    this.rippling_amplitude_variation = parseFloat(event.target.value);
        //}
        this.rippling_frequency_slider = document.getElementById("rippling_frequency");
        this.rippling_frequency_slider.oninput = (event) => {
            this.rippling_frequency = parseFloat(event.target.value);
        }
        this.rippling_speed_slider = document.getElementById("rippling_speed");
        this.rippling_speed_slider.oninput = (event) => {
            this.rippling_speed = parseFloat(event.target.value);
        }

        this.pulsation_amplitude_slider = document.getElementById("pulsation_amplitude");
        this.pulsation_amplitude_slider.oninput = (event) => {
            this.pulsation_amplitude = parseFloat(event.target.value);
        }
        this.pulsation_frequency_slider = document.getElementById("pulsation_frequency");
        this.pulsation_frequency_slider.oninput = (event) => {
            this.pulsation_frequency = parseFloat(event.target.value);
        }
        this.pulsation_speed_slider = document.getElementById("pulsation_speed");
        this.pulsation_speed_slider.oninput = (event) => {
            this.pulsation_speed = parseFloat(event.target.value);
        }

        this.repel_distance_slider = document.getElementById("repel_distance");
        this.repel_distance_slider.oninput = (event) => {
            this.repel_distance = parseFloat(event.target.value);
        }
        //this.repel_variance_slider = document.getElementById("repel_variance");
        //this.repel_variance_slider.oninput = (event) => {
        //    this.repel_variance = parseFloat(event.target.value);
        //}

    }

}