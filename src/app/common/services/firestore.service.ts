import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc, updateDoc, getDoc, addDoc } from 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore/lite';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Asignatura } from '../models/asignatura.model'; 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore: Firestore = inject(Firestore);

  constructor() { }

  async getDocument<tipo>(path: string): Promise<tipo | undefined> {
    const documentRef = doc(this.firestore, path); // Asegúrate de usar 'doc' aquí
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      return documentSnapshot.data() as tipo;
    } else {
      return undefined;
    }
  }

  getDocumentChanges<tipo>(enlace: string) {
    console.log('getDocumentChanges', enlace);
    const itemCollection = collection(this.firestore, enlace);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  getCollectionChanges<tipo>(path: string) {
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
  
  async updateDocument(enlace: string, idDoc: string, data: any){
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

  // Métodos específicos para Asignaturas

  //para crear una nueva asignatura:
  createAsignatura(asignatura: Asignatura) {
    const asignaturasCollection = collection(this.firestore, 'Asignaturas');
    return addDoc(asignaturasCollection, asignatura);
  }

  //para actualizar una asignatura existente:
  getAsignaturas() {
    const asignaturasCollection = collection(this.firestore, 'Asignaturas');
    // collectionData devuelve un Observable que se actualiza en tiempo real.
    // { idField: 'id' } mapea el ID del documento de Firestore al campo 'id' de nuestra interface.
    return collectionData(asignaturasCollection, { idField: 'id' }) as any; // Usamos 'any' por ahora para simplificar
  }

}
