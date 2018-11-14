import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  cells: any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public firebaseProvider: FirebaseStoreProvider){
    this.movies = firebaseProvider.listMovies(); 
  this.cells=[1,2,3,4,5];  
  this.items = [
   "DATABASE_NAME",
  ];
}
    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
openSettings(){
  this.navCtrl.push("SettingspagePage");
}
editItem(item){ 
  let prompt = this.alertCtrl.create({
    title: 'Edit the database title',
    inputs: [{
      name: 'name'
    }],
    buttons: [
      {
        text: 'Cancel'
      },
      {
        text: 'Save',
          handler: data => {
            this.items[this.items.length] = item
          //  let index = this.items.indexOf(item);
 
         /*   if(index > -1){
              this.items[index] = data.name; 
            } */
        }
       }
     ]
   });
 
   prompt.present();      
}
}
