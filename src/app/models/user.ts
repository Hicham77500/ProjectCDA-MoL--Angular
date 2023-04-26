export class User {
    public uid: number;
    public email: string;
    public plainPassword: string;
    public password: string;
    public genre: string;
    public username: string;
    public lastname: string;
    public firstname: string;
    public age: Date;
    public roles: string[];
    public role: string;
    constructor(
        ) {
        this.uid = 0;
        this.email = '';
        this.plainPassword = '';
        this.password = '';
        this.genre = '';
        this.username = '';
        this.lastname = '';
        this.firstname = '';        
        this.roles = [];
        this.role = '';  
        this.age = new Date();  
    }
}