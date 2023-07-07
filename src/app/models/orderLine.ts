export class OrderLine {
    public idOrderLine: number;
    public idOrder: number;
    public idProd: number;
    public prodName:string;
    public prodPrice:number;
    public quantity: number;
    public amount: number;
    

    constructor() {
        this.idOrderLine = 0;
        this.idOrder = 0;
        this.idProd = 0;
        this.prodName = "";
        this.prodPrice = 0;
        this.quantity = 0;
        this.amount = 0;
    }
    setIdOrder(idOrder : number){
        this.idOrder = idOrder;
    }

    setIdProd(idProd : number){
        this.idProd = idProd;
    }
    setQuantity(quantity : number){
        this.quantity = quantity;
    }
    setAmount(amount : number){
        this.amount = amount;
    }
    setProdName(prodName : string){
        this.prodName = prodName;
    }
    setProdPrice(prodPrice : number){
        this.prodPrice = prodPrice;
    }
}