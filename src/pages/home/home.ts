import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mains: Observable<any[]>;
  cells: any;
  items: any;
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public firebaseProvider: FirebaseStoreProvider){
    this.mains = firebaseProvider.listTitle(); 
  this.cells=[1,2,3,4,5];  
//  this.items = [
 //  "DATABASE_NAME",
 // ];
}
    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
openSettings(){
  this.navCtrl.push("SettingspagePage");
}
updateTitle(item){
  let prompt = this.alertCtrl.create({
    title: 'edit title',
    message: "Edit title",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title',
        value: item.title //<<Cannot read property 'title' of undefined
      }
    ],
    buttons: [
      {
        text: 'Cancel'
      },
      {
        text: 'Save',
        handler: data => {
          this.firebaseProvider.updateTitle(item.id, data);
        }
      }
    ]
  });
  prompt.present();
}
  openSpreadsheet1(){
    
  }
}
