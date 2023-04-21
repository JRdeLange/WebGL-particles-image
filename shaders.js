export const dynamic_vertex_source = `
  precision highp float;
  attribute vec2 position;
  attribute vec4 color;
  attribute vec3 random_nrs;
  varying vec4 fragcolor;
  uniform float time;
  uniform vec2 mouse;
  uniform float react_distance;             // 0.6 0.0 2.0
  uniform float size;                       // 3.0 0.0 25.0
  uniform float magnification;              // 0.0 -5.0 5.0

  uniform float waves_amplitude;            // 40.0 0.0 100.0 invert
  uniform float waves_amplitude_variation;  // 7.0 0.0 20.0
  uniform float waves_frequency;            // 30.0 0.0 100.0
  uniform float waves_speed;                // 3.5 0.0 25.0

  uniform float rippling_amplitude;         // 25.0 0.0 100.0 invert
  uniform float rippling_amplitude_variation; // 7.0 0.0 20.0
  uniform float rippling_frequency;         // 40.0 0.0 100.0
  uniform float rippling_speed;             // 10.0 0.0 25.0

  uniform float pulsation_amplitude;        // 6.0 0.0 20.0
  uniform float pulsation_frequency;        // 6.5 0.0 100.0
  uniform float pulsation_speed;            // 5.0 0.0 100.0

  uniform float repel_distance;             // 0.03 0.0 1.0
  uniform float repel_variance;             // 8.0 0.0 25.0   invert


  void main() {
    
    // Calculate vector to mouse
    vec2 vector = mouse - position;
    float dist = length(vector);
    
    vec2 posxy = position;
    float new_size = size;

    // If the point is within the react distance
    if (dist < react_distance) {
      // Calculate movement scalar
      float movement_factor = (react_distance - dist) * (1.0/react_distance); 
      float mf2 = movement_factor * movement_factor;

      // Calculate random repel variance
      float random_repel_variance = random_nrs.x / repel_variance + repel_distance;

      // Repel
      posxy = posxy - normalize(vector) * mf2 * random_repel_variance;

      // Wavyness
      posxy.x += (sin(position.y * waves_frequency + time * waves_speed + random_nrs.y) * 
        (waves_amplitude + random_nrs.x * waves_amplitude_variation)) * mf2;
      posxy.y += (sin(position.x * waves_frequency + time * waves_speed + random_nrs.z) * 
        (waves_amplitude + random_nrs.x * waves_amplitude_variation)) * mf2;

      // Magnification
      posxy -= magnification * (vector * mf2);

      // Rippling
      posxy -= vector * ((sin((react_distance - dist) * rippling_frequency + time * rippling_speed + random_nrs.y) *
        (rippling_amplitude + random_nrs.x * rippling_amplitude_variation)) * mf2);
    
      // Pulsating if mouse is close
      float new_pos_to_mouse = length(mouse - posxy);
      //new_size = mix(size, (sin(time * pulsation_speed - (new_pos_to_mouse) * pulsation_frequency + random_nrs.y) + 1.0) * 0.5 * size, sqrt(movement_factor));
    }

    // Set new position
    gl_Position = vec4(posxy, 0.0, 1.0);

    // Size grows and shrinks using a sine with a random offset
    gl_PointSize = new_size;
    
    // Color is color
    fragcolor = color;
  }
`;

export const old_vertex_source = `
  precision highp float;
  attribute vec2 position;
  attribute vec4 color;
  attribute vec3 random_nrs;
  varying vec4 fragcolor;
  uniform float time;
  uniform vec2 mouse;
  uniform float react_distance;


  void main() {
    
    // Calculate vector to mouse
    vec2 vector = mouse - position;
    float dist = length(vector);

    // Determine new position
    vec2 posxy = position;
    float size = 6.0;

    // If the point is within the react distance
    if (dist < react_distance) {
      // Calculate movement scalar
      float movement_factor = (react_distance - dist) * (1.0/react_distance); 
      float mf2 = movement_factor * movement_factor;
      
      // Calculate random movement variance
      float random_variance = random_nrs.x / 8.0 + 0.10;

      // Calculate new postion
      posxy = position - normalize(vector) * movement_factor *  movement_factor * random_variance;
      
      //posxy = position.y - vector* 1.2 * movement_factor * movement_factor;
      // Random position wandering
      //posxy.x += (sin(position.y * 28.0 + time * 3.1415 + random_nrs.y) / (43.0 + random_nrs.x * 7.0)) * movement_factor;
      //posxy.y += (sin(position.x * 28.0 + time * 3.1415 + random_nrs.z) / (43.0 + random_nrs.x * 7.0)) * movement_factor;
      //posxy -= vector * ((sin((react_distance -dist) * 68.0 + time * 9.1415 + random_nrs.x) / (23.0 + random_nrs.x * 7.0)) * movement_factor );
      //posxy -= vector * movement_factor * movement_factor;

      //posxy -= 1.5 * (vector * mf2);

      
      // Pulsating if mouse is close
      
      float len = length(mouse - posxy);
      size = mix(size, (sin(time * 100.0 - (len) * 60.0 + random_nrs.y) + 1.0 ) * 0.5 * size, sqrt(movement_factor));
    } 

    

    // Set new position
    gl_Position = vec4(posxy, 0.0, 1.0);

    // Size grows and shrinks using a sine with a random offset
    gl_PointSize = size;
    
    // Color is color
    fragcolor = color;
  }
`;

export const fragment_source = `
  precision highp float;
  varying vec4 fragcolor;
 
  void main() {
    vec2 color;
    color.x = mod(gl_FragCoord.x, 40.0) / 40.0;
    color.y = mod(gl_FragCoord.y, 40.0) / 40.0;
    gl_FragColor = fragcolor;
  }
`;