import { Post } from "./post";

export class User {
    public uid: number;
    public email: string;
    public plainPassword: string;
    public password: string;
    public genre: string;
    public username: string;
    public completeName: string;

    public age: Date;
    public roles: string[];
    public role: string;
    public profileImageURL: string;
    public biography:string;
    public listPost: Post[];

    constructor(
        ) {
        this.uid = 0;
        this.biography='';
        this.email = '';
        this.profileImageURL = '';
        this.plainPassword = '';
        this.password = '';
        this.genre = '';
        this.username = '';
        this.completeName = '';       
        this.roles = [];
        this.role = '';  
        this.age = new Date();  
        this.listPost = [];
    
    }
}