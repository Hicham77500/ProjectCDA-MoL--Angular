export class Post {
    public idPost: number;
    public idUser: number;
    public description: string;
    public date: Date;
    public username: string;
    public profileImageURL: string;
    public listPictures: string[];
    public listComments: string[];
    public listHearts: string[];

    constructor(
    ) {
        this.idPost = 0;
        this.idUser = 0;
        this.description = '';
        this.username = '';
        this.profileImageURL = '';
        this.date = new Date();
        this.listPictures = [];
        this.listComments = [];
        this.listHearts = [];
    }
}