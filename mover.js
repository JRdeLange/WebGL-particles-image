export default class Mover{

    constructor(particles) {
        this.particles = particles;
        this.max_size = 100;
        this.min_size = 10;
    }

    move_particles() {
        this.particles.forEach(particle => {
            if (particle.size > this.max_size) {
                particle.growing = false;
            } else if (particle.size < this.min_size) {
                particle.growing = true;
            }

            if (particle.growing) {
                particle.size += 1;
            } else {
                particle.size -= 1;
            }
        });
    }
    


}