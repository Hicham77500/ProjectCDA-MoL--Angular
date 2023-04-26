export class Post{
    public idPost: number;
    public idUser: number;
    public description: string;
    public date: Date;
    public listPictures: string[];
    public listComments: string[];

    constructor(
        ) {
        this.idPost = 0;
        this.idUser = 0;     
        this.description = '';  
        this.date = new Date();
        this.listPictures = [];
        this.listComments = []; 
    } 
}