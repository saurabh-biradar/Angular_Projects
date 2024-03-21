export class Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    constructor() {
        this.id = this.price = 0;
        this.name = this.image_url = "";
    }
}
