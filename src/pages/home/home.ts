import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 // animals: Observable<any[]>;
  constructor(public navCtrl: NavController){
    
    /*, public firebaseProvider: FirebaseStoreProvider, public alertCtrl: AlertController) {
    this.animals = firebaseProvider.listAnimals();
    */}
    ionViewDidLoad() {
      console.log('ionViewDidLoad HomePage');
    }
openSettings(){
  this.navCtrl.push("SettingspagePage");
}
}
