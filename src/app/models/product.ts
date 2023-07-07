export class Product {
    public idProd: number;
    public idCat: number;
    public name: string;
    public description: string;
    public stock: number;
    public urlImage: string;
    public price: number;
    public quantity:number;

    constructor() {
        this.idProd = 0;
        this.idCat = 0;
        this.name = "";
        this.description = "";
        this.stock = 0;
        this.urlImage = "";
        this.price= 0; 
        this.quantity = 0;
    }
}