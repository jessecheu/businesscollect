import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


import * as firebase from 'firebase';
import { Observable } from 'rxjs';


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
    getOrCreateUserProfile(userId): Observable<any>{
      this.checkCreateUserProfile(userId);
      return this.getUserProfile(userId);    
    }
  
    getUserProfile(userId): Observable<any>{
      return this.afs.doc('/database/' + userId).snapshotChanges().map(
        item => {
          if(item.payload.exists){
            const id = item.payload.id;
            const data = item.payload.data();
            data['id'] = id;
            return data;
          }
        }
      );
    }
  
    checkCreateUserProfile(userId){
      var profile = this.afs.firestore.doc('/database/' + userId).get().then(
        doc => {
          if(doc.exists){
            console.log("profile exists");
          }
          else{
            console.log("profile does not exist, creating");
            this.afs.collection('/database/').doc(userId).set({
              userName: "New User",  
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
          }
          return doc;
        }      
      )
      return profile;
    }  
}