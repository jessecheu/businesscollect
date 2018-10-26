import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingspagePage } from './settingspage';

@NgModule({
  declarations: [
    SettingspagePage,
  ],
  imports: [
    IonicPageModule.forChild(SettingspagePage),
  ],
})
export class SettingspagePageModule {}
