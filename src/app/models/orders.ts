export class Orders {
    public idOrder: number;
    public idUser: number;
    public userLastName: string;
    public userFirstName: string;
    public refOrder: string;
    public dateOrder: Date;
    public total: number;
    public listOrderLines: [];

    constructor() {
        this.idOrder = 0;
        this.idUser = 0;
        this.userLastName = "";
        this.userFirstName = "";
        this.refOrder = "";
        this.dateOrder =new Date();
        this.total = 0;
        this.listOrderLines = [];
    }
    setIdUser(idUser : number){
        this.idUser = idUser;
    }
    setRefOrder(refOrder : string){
        this.refOrder = refOrder;
    }
    setUserLastName(userLastName : string){
        this.userLastName = userLastName;
    }
    setUserFirstName(userFirstName : string){
        this.userFirstName = userFirstName;
    }
    setTotal(total : number){
        this.total = total;
    }
}