import { Injectable } from '@angular/core';

import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Compra } from '../compras/compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private compraCollection;

  constructor(private fireStore: Firestore) { 
    this.compraCollection = collection(this.fireStore, 'compras');
  }

  addCompra(compra: Compra) {
    return addDoc(this.compraCollection, compra);
  }
}
