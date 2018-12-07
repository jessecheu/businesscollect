        import { Component } from '@angular/core';
        import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
        import { HomePage } from '../home/home';
        import { Spreadsheet1Page } from '../spreadsheet1/spreadsheet1';
        import { AngularFireAuth } from 'angularfire2/auth';
        import { AlertController } from 'ionic-angular';
        import { LoginPage } from '../login/login';

        @IonicPage()
        @Component({
          selector: 'page-settingspage',
          templateUrl: 'settingspage.html',
        })
        export class SettingspagePage {

          constructor(
            private afAuth: AngularFireAuth, private toast: ToastController,
            public navCtrl: NavController, public navParams: NavParams,
            public alertCtrl: AlertController) {
            }

          ionViewDidLoad() {
            this.afAuth.authState.subscribe(data => {
              if(data && data.email && data && data.uid) {
              this.toast.create({
           //     message: 'Welcome to the DATABASE, ${data.email}',
                duration: 3000,
              }).present();
            }
            else {
              this.navCtrl.setRoot(LoginPage);
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
      // logout(){
      //   let prompt = this.alertCtrl.create({
      // // /*    title: 'LOGOUT',
      // //     inputs: [{
      // //       name: 'name'
      // //     }], */
      //     buttons: [
      //       {
      //         text: 'Cancel'
      //       }, 
      //       {  
      //         text: 'LOGOUT',
      //           handler: data => {
      //             this.afAuth.auth.signOut();
      //              this.navCtrl.push(LoginPage);
      //           //   console.log(LoginPage);
      //          }
      //        }
      //      ]
      //    });
      //    prompt.present();      
      // }          
      logout(){
        this.afAuth.auth.signOut();        
        this.navCtrl.push(LoginPage);    
      }
}
