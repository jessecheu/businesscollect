import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
@IonicPage()
@Component({
  selector: 'page-spreadsheet1',
  templateUrl: 'spreadsheet1.html'
})
export class Spreadsheet1Page {
  
  user: User;
  columns: any;
  mains: Observable<any[]>;
  datas: Observable<any[]>;
  cells: any;
  items: any;
  item: any;
  data: Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public firebaseProvider: FirebaseStoreProvider,
    private afAuth: AngularFireAuth,){
    this.mains = firebaseProvider.listTitle(); 
    this.datas = firebaseProvider.ListData();
    this.cells = [1,2,3,4,5,6,7,8,9];
    this.columns = ["A", "B", "C","D","E","F","G","H","I","J","K"];
    this.items = {};
    this.afAuth.authState.subscribe(
      user => {
        this.user = user;
        console.log(user);
        if(user != null){
        this.data = this.firebaseProvider.getOrCreateUserProfile(user.uid)
        this.data.subscribe(data =>
          {
            this.items = {};
            for( var k in data){
              this.items[k]=data[k]
            }
        /*    data.map(fav => {

            }) */
          })
        }
      }
    )

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
        value: item.id //<<Cannot read property 'title' of undefined
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
 /* addData(){
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
  */
 editItem(cell){ 
   console.log(cell);
  let prompt = this.alertCtrl.create({
    title: 'Edit Item',
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
            var info = {}
            info [cell] = data.name
           this.firebaseProvider.updateData(this.user.uid, info);

          /*  let index = this.cells.indexOf(cell);
            if(index > -1){
              this.cells[index] = data.name;
            } */  
         }
       }
     ]
   });
   prompt.present();      
}
/*   dataTest(cell){
    console.log(cell);
    this.items[cell]="Test";
  } */ 
  logout(){
    let prompt = this.alertCtrl.create({
   /*   title: 'LOGOUT',
      inputs: [{
        name: 'name'
      }], */
      buttons: [
        {
          text: 'Cancel'
        }, 
        {  
          text: 'LOGOUT',
            handler: data => {
              this.afAuth.auth.signOut();
              this.navCtrl.push("LoginPage");
           }
         }
       ]
     });
     prompt.present();      
  }
}
