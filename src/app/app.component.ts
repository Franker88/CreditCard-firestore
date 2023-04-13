import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'creditCard';

  //firestore: Firestore = inject(Firestore);
  items$: Observable<any[]> | undefined;

  constructor(){
    
  }
}
