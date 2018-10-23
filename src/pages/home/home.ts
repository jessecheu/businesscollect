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
  animals: Observable<any[]>;
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseStoreProvider, public alertCtrl: AlertController) {
    this.animals = firebaseProvider.listAnimals();
  }

  addAnimals(){
    let prompt = this.alertCtrl.create({
      title: 'Add a animal',
      message: "Add a new Animal",
      inputs: [
        {
          name: 'color',
          placeholder: 'Color'
        },
        {
          name: 'size',
          placeholder: 'Size'
        },
        {
          name: 'type',
          placeholder: 'Type'
        },
        {
          name: 'year',
          placeholder: 'Year',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.addAnimals(data);  //Call our function from the first part
          }
        }
      ]
    });
    prompt.present();
  }
  deleteAnimals(title, id){
    const confirm = this.alertCtrl.create({
      title: 'Delete this Animal?',
      message: 'Do you really want to delete "' + title + '"?',
      buttons: [
        {
          text: 'Cancel', 
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.deleteAnimal(id); 
          }
        }
      ]
    });
    confirm.present();
  }
  updateAnimal(item){
    let prompt = this.alertCtrl.create({
      title: 'Edit the Animal',
      message: "Edit Animal data",
      inputs: [
        {
          name: 'color',
          placeholder: 'Color',
          value: item.color
        },
        {
          name: 'size',  
          placeholder: 'Size',
          value: item.size
        },
        {
          name: 'type',  
          placeholder: 'Type',
          value: item.type
        },
        {
          name: 'year',
          placeholder: 'Year',
          type: 'number', 
          value: item.year
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.updateAnimal(item.id, data);
          }
        }
      ]
    });
    prompt.present();
  }  
}