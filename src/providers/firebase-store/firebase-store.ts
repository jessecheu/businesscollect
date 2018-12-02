import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }
  listTitle(){
    return this.afs.collection('/mains').valueChanges();
  }
  updateTitle(id,data){
    this.afs.doc('/mains/' + id).update(data);
  }
  ListData(){
    return this.afs.collection('/datas').valueChanges();
  }
  updateData(id, data){
    this.afs.doc('/database/' + id).update(data);
  }

  addData(value){
    console.log(value);
    return new Promise<any>((resolve,reject) => {
      this.afs.collection('/database').add({
        date: parseInt(value.year),
        name: (value.Name)
      })
      .then(
        (res) => {
          resolve(res)
        },
          err => reject(err)
        )
      })
    }
}