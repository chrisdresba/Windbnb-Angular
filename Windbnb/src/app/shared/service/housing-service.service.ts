import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subject } from 'rxjs';
import { Housing } from '../../class/housing';

@Injectable({
  providedIn: 'root'
})
export class HousingServiceService {

  public housings: Observable<any[]>;
  isCount = new Subject<number>();
  housingNotFound = new Subject<boolean>();

  constructor(private firestore: AngularFirestore) {
    this.housings = this.firestore.collection('housing').valueChanges();
  }

  reloadCount(value : number): void {
    this.isCount.next(value);
    value == 0 ? this.housingNotFound.next(false) : this.housingNotFound.next(true);
  }

   getHousing = (): Observable<any[]> => {

    return this.firestore.collection('housing').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Housing[];
      })
    );
  }

}
