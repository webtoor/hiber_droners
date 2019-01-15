import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }

  allType() {
    this.viewCtrl.dismiss({
      kode : '0'
    });
  }
  // Pemetaan Tanaman
  petaTanaman() {
    this.viewCtrl.dismiss({
      kode : '1'
    });
  }
  // Liburan
  Liburan() {
    this.viewCtrl.dismiss({
      kode : '2'
    });
  }
  
  // lalu-lintas
  laluLintas() {
    this.viewCtrl.dismiss({
      kode : '3'
    });
  }

  // konsBangunan
  konsBangunan() {
    this.viewCtrl.dismiss({
      kode : '4'
    });
  }

   // Pengawasan
   pengawasan() {
    this.viewCtrl.dismiss({
      kode : '5'
    });
  }
}
