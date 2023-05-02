export class Message {
    public idMessage: number;
    public idChat: number;
    public idUser: number;
    public content: string;
    public dateTime: Date;
   

    constructor(
    ) {
        this.idMessage = 0;
        this.idChat = 0;
        this.idUser = 0;
        this.content = '';
        this.dateTime = new Date();
    }
}