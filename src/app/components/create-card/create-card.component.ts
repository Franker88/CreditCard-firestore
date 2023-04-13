import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit{
  forms: FormGroup;
  loading: boolean = false;
  title: string = "Create New Card";
  id: string | undefined;

  constructor(
    private fb: FormBuilder, 
    private _cardService: CardService, 
    private toastr: ToastrService
    ){
    this.forms = this.fb.group({
      owner:["",Validators.required],
      number:["",[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      eDate:["",[Validators.required,Validators.minLength(7),Validators.maxLength(7)]],
      cvv:["",[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    })
  }

  ngOnInit(): void {
    this._cardService.getCard().subscribe(res=>{
      this.title = "Edit Card";
      this.id = res.id;
      this.forms.patchValue({
        owner:res.owner,
        number:res.cardNumber,
        eDate:res.eDate,
        cvv:res.cvv,
      })
    })
  }

  createCard(){
    this.loading = true;
    const CARD: CreditCard = {
      owner: this.forms.value.owner,
      cardNumber: this.forms.value.number,
      eDate: this.forms.value.eDate,
      cvv: this.forms.value.cvv,
      cDate: new Date(),
      uDate: new Date()
    }
    //console.log(CARD);

    this._cardService.saveCard(CARD).then(()=>{
      this.loading = false;
      this.toastr.success("Successful card registration","Card Registered");
      this.forms.reset();
    },err=>{
      this.loading = false;
      this.toastr.error("An error has occurred", "Registration Error");
    })
    
  }

  updateCard(id:string){
    this.loading = true;
    const CARD: CreditCard = {
      owner: this.forms.value.owner,
      cardNumber: this.forms.value.number,
      eDate: this.forms.value.eDate,
      cvv: this.forms.value.cvv,
      uDate: new Date()
    }
    this._cardService.updateCard(id,CARD).then(()=>{
      this.loading = false;
      this.toastr.info("Data updated successfully","Updated");
      this.forms.reset();
      this.title = "Create New Card";
      this.id=undefined;
    },err=>{
      this.loading = false;
      this.toastr.error("An error has occurred", "Update Error");
    });
  }

  processCard(){
    if(this.id === undefined){
      this.createCard();
    }else{
      this.updateCard(this.id);
    }
  }

  /* showSuccess(){
    this.toastr.success('Error world!', 'Toastr fun!');
  } */
}
