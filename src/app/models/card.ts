export class CreditCard{
    id?: string;
    owner: string;
    cardNumber: string;
    eDate?: Date;
    cvv: number;
    cDate?: Date;
    uDate: Date;

    constructor(owner:string,cardNumber:string,cvv:number){
        this.owner = owner;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.cDate = new Date();
        this.uDate = new Date();
        this.eDate = new Date();
    }
}