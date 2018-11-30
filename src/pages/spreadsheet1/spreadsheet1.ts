import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';
@IonicPage()
@Component({
  selector: 'page-spreadsheet1',
  templateUrl: 'spreadsheet1.html'
})
export class Spreadsheet1Page {
  mains: Observable<any[]>;
  datas: Observable<any[]>;
  cells: any;
  items: any;
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public firebaseProvider: FirebaseStoreProvider){
    this.mains = firebaseProvider.listTitle(); 

    this.datas = firebaseProvider.ListData();

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
  addData(){
    let prompt = this.alertCtrl.create({
      title: 'Inserting New Data',
    //  message: "",
      inputs: [
        {
          name: 'Date',
          placeholder: 'Enter a new date:'
        },
        {
          name: 'Name',
          placeholder: 'Enter a new name:'
        },
        {
          name: 'Cell',
          placeholder: 'Enter data in Cell #1:'
        }
      ],
      buttons: [
        {
          text:'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.addData(data);
          }
        }
      ]
    });
    prompt.present();
  }
}
