import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listAnimals(){
    return this.afs.collection('/animals').snapshotChanges().pipe(
      map(actions => actions.map(item => {
        const id = item.payload.doc.id;
        const data = item.payload.doc.data();
        data['id'] = id;
        return data;
      }))
    );
  }
  deleteAnimal(id){
    this.afs.doc('/animals/' + id).delete();
  }
  addAnimals(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/animals').add({
        color: value.color,
        size: value.size,
        type: value.type,
        year: parseInt(value.year)
      })
      .then(
        (res) => {
          resolve(res)
        },
          err => reject(err)
      )
    })
   }
   updateAnimal(id, data){
    this.afs.doc('/animals/' + id).update(data);
  }   
}