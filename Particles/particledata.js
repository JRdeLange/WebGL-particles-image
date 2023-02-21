export default class Particledata {

    constructor() {
        this.nr = 0
        this.positions = [];
        this.colors = [];
        this.random_nrs = [];
    }

    add_particle(position, color) {
        this.nr += 1;
        this.positions.push(position[0], -position[1]);
        this.colors.push(color[0], color[1], color[2], color[3]);
        this.random_nrs.push(Math.random(), Math.random(), Math.random());
    }
}