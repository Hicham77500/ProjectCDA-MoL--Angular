export class Chat {
    public idChat: number;
    public idUser: number;
    public idOtherUser: number;
    public listMessages: [];
   

    constructor(
    ) {
        this.idChat = 0;
        this.idUser = 0;
        this.idOtherUser = 0;
        this.listMessages = [];
    }
}