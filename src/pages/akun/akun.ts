import { Component } from '@angular/core';
import { MenuController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AkunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {
  public userDetails : any;
  public responseData: any;
  acces_token : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,) {
    this.menu.swipeEnable(false);
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AkunPage');
  }
  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
   }

  logout(){
     //Api Token Logout
     localStorage.clear();
      setTimeout(()=> this.backToWelcome(), 1000);
   }
}
