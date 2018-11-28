import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingspagePage } from './settingspage';
import { AngularFireAuthModule } from 'angularfire2/auth';
@NgModule({
  declarations: [
    SettingspagePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingspagePage),
  ],
})
export class SettingspagePageModule {}
