import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-settingspage',
  templateUrl: 'settingspage.html',
})
export class SettingspagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingspagePage');
  }
openHome(){
  this.navCtrl.push(HomePage);
}
}
