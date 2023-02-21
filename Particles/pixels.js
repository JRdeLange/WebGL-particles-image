export default class Pixels{
    constructor(file, func){
        this.image = new Image()
        this.pixels = this.read_image(file, this.image, func)
    }

    read_image(file, image, func) {
        let pixels = []
        image.crossOrigin = "Anonymous";
        image.onload = function() {
            let img_canvas = document.createElement('canvas');
            img_canvas.width = image.width;
            img_canvas.height = image.height;
            let img_context = img_canvas.getContext("2d")
            img_context.drawImage(image, 0, 0);
            let imageData = img_context.getImageData(0, 0, img_canvas.width, img_canvas.height);

            for (let x = 0; x < img_canvas.width; x++) {
                const row = [];
                for (let y = 0; y < img_canvas.height; y++) {
                const offset = (y * img_canvas.width + x) * 4;
                const r = imageData.data[offset];
                // const g = imageData.data[offset + 1];
                // const b = imageData.data[offset + 2];
                // const a = imageData.data[offset + 3];
                // row.push([r, g, b, a]);
                row.push([r / 255])
                }
                pixels.push(row);
            }
            func()
        }
        image.src = file
        return pixels
        
    }

}