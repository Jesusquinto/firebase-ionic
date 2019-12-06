import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AudioInterface } from '../interfaces/audios';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Agenda } from '../interfaces/agenda';
import { Asignatura } from '../interfaces/asignatura'

AuthService
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore, private servicio: AuthService, private storage: AngularFireStorage) { }
/*   private booksCollection: AngularFirestoreCollection<BookInterface>;
  private books: Observable<BookInterface[]>;
  private bookDoc: AngularFirestoreDocument<BookInterface>;
  private book: Observable<BookInterface>; */

  private audiosCollection: AngularFirestoreCollection<AudioInterface>;
  private audios: Observable<AudioInterface[]>;
  private audioDoc: AngularFirestoreDocument<AudioInterface>;
  private audio: Observable<AudioInterface>;

  private asignaturasCollection: AngularFirestoreCollection<Asignatura>;
  private asignaturas: Observable<Asignatura[]>;
  private asignaturaDoc: AngularFirestoreDocument<Asignatura>;
  private asignatura: Observable<Asignatura>;

  private agendasCollection: AngularFirestoreCollection<Agenda>;
  private agendas: Observable<Agenda[]>;
  private agendaDoc: AngularFirestoreDocument<Agenda>;
  private agenda: Observable<Agenda>;


/*   public selectedBook: BookInterface = {
    id: null
  };
 */

getAllAgendas(){
  this.agendasCollection = this.afs.collection<Agenda>('agendas');
  return this.agendas = this.agendasCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Agenda;
        data.id = action.payload.doc.id;

        return data;
      });
    }));
}


addAgenda(agenda: Agenda): void{
  this.afs.collection<Agenda>('agendas').add(agenda);
}

updateAgenda(agenda: Agenda): void {
  let idAgenda = agenda.id;
  this.agendaDoc = this.afs.doc<Agenda>(`agendas/${idAgenda}`);
  this.agendaDoc.update(agenda);
}


  getAllAsignaturas(){
    this.asignaturasCollection = this.afs.collection<Asignatura>('asignaturas');
    return this.asignaturas = this.asignaturasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {

          const data = action.payload.doc.data() as Asignatura;
          data.id = action.payload.doc.id;

          return data;
        });
      }));
  }


  addAsignatura(asignatura: Asignatura): void{
    this.afs.collection<Asignatura>('asignaturas').add(asignatura);
  }


  updateAsignatura(asignatura: Asignatura): void {
    let idAsignatura = asignatura.id;
    this.asignaturaDoc = this.afs.doc<Asignatura>(`asignaturas/${idAsignatura}`);
    this.asignaturaDoc.update(asignatura);
  }


  getAllAudios(){
    this.audiosCollection = this.afs.collection<AudioInterface>('audios');
    return this.audios = this.audiosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {

          const data = action.payload.doc.data() as AudioInterface;
          data.id = action.payload.doc.id;

          return data;
        });
      }));
  }


/*   getAllBooks() {
    this.booksCollection = this.afs.collection<BookInterface>('books');
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {

          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;

          return data;
        });
      }));
  }
 */

  getUserAudios(userId){
    this.audiosCollection = this.afs.collection('audios', ref => ref.where('users.'+userId, '==',  true));
    return this.audios = this.audiosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as AudioInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


/*   getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  } */

 /*  getOneBook(idBook: string) {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as BookInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  } */

/*   getUser(idUser){
    this.userDoc = this.afs.doc<UserInterface>(`users/${idUser}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  } */


  addAudio(audio: AudioInterface): void{
    this.afs.collection<AudioInterface>('audios').add(audio);
  }

/*   addBook(book: BookInterface): void {



    this.booksCollection.add(book);
    
  } */
/*   updateBook(book: BookInterface): void {
    let idBook = book.id;
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.update(book);
  }
  deleteBook(idBook: string): void {
    this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
    this.bookDoc.delete();
  } */

  deleteAudio(audio: AudioInterface): void{
    this.storage.storage.refFromURL(audio.url).delete().then(result =>{
      this.audioDoc = this.afs.doc<AudioInterface>(`audios/${audio.id}`);
      this.audioDoc.delete();
    }).catch(error =>{
      console.log(error);
    })
  }
}