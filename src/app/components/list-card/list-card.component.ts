import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  constructor(private _cardService: CardService,private toastr: ToastrService){

  }

  listCards: CreditCard[] = [];

  ngOnInit(): void {
    this.cardList();
  }

  cardList(){
    this._cardService.listCards().subscribe(res=>{
      this.listCards = [];
      res.forEach((element:any) => {
        this.listCards.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteCard(id:any){
    this._cardService.deleteCard(id).then(()=>{
      this.toastr.success("Card deleted successfully","Card Deleted");
    },err =>{
      this.toastr.error("An error has ocurred deleting card","Card Delete error");
      console.log(err);
    });
  }

  editCard(card:CreditCard){
    this._cardService.editCard(card);
  }
}
