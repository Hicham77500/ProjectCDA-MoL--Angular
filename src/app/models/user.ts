export class User {
    public uid: number;
    public username: string;
    public email: string;
    public password: string;
    public genre: string;
    public lastName: string;
    public firstName: string;
    public adress: string;
    public city: string;
    public age: Date;
    public mobileNumber: string;
    public biography:string;
    public listOrders: [];
    public roles: string[];
    public role: string;
    public profileImageURL: string;


    constructor(
        ) {
        this.uid = 0;
        this.biography='';
        this.email = '';
        this.profileImageURL = '';
        this.password = '';
        this.genre = '';
        this.username = '';
        this.lastName = '';  
        this.firstName= '';     
        this.adress= '';  
        this.city= '';  
        this.age = new Date();  
        this.mobileNumber= '';  
        this.listOrders = [];
        this.roles = [];
        this.role = '';  
    }
}