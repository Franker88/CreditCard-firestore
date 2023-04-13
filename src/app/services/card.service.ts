import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CreditCard } from '../models/card';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private card$ = new Subject<any>();

  constructor(private firebase: AngularFirestore) { }

  saveCard(card: CreditCard): Promise <any>
  {
    return this.firebase.collection('cards').add(card);
  }

  listCards(): Observable<any>
  {
    return this.firebase.collection("cards",ref=>ref.orderBy("cDate","asc")).snapshotChanges();
  }

  deleteCard(id:string): Promise<any>
  {
    return this.firebase.collection("cards").doc(id).delete();
  }

  editCard(card:CreditCard)
  {
    this.card$.next(card);
  }

  getCard():Observable<CreditCard>
  {
    return this.card$.asObservable();
  }

  updateCard(id: string, card: any): Promise<any>
  {
    return this.firebase.collection("cards").doc(id).update(card);
  }
}
