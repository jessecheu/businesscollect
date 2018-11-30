        import { Component } from '@angular/core';
        import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
        import { HomePage } from '../home/home';
        import { Spreadsheet1Page } from '../spreadsheet1/spreadsheet1';
        import { AngularFireAuth } from 'angularfire2/auth';
        @IonicPage()
        @Component({
          selector: 'page-settingspage',
          templateUrl: 'settingspage.html',
        })
        export class SettingspagePage {

          constructor(
            private afAuth: AngularFireAuth, private toast: ToastController,
            public navCtrl: NavController, public navParams: NavParams) {
            }

          ionViewDidLoad() {
            this.afAuth.authState.subscribe(data => {
              if(data && data.email && data && data.uid) {
              this.toast.create({
                message: 'Welcome to the DATABASE, ${data.email}',
                duration: 3000,
              }).present();
            }
            else {
              this.navCtrl.setRoot('Login')
              this.toast.create({
                message: 'Incorrect email or password',
                duration: 3000
              }).present();
            }
          })
        }
          

            openHome(){
              this.navCtrl.push('Spreadsheet1Page');  
            }
          
}
