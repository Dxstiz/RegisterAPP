import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }

  getCollectionChanges<tipo>(path: string) {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  getDocumentChanges<tipo>(path: string) {
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  createDocument(data: any, enlace: string){
    const document = doc(this.firestore, enlace);
    return setDoc(document, data);
  }

  createDocumentID(data: any, enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document, data);
  }

  async updateDocumentID(data: any, enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return updateDoc(document, data);
  }

  deleteDocumentID(enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  createIdDoc(){
    return uuidv4();
  }

}
