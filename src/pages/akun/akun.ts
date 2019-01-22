import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';

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

  constructor(public fcm: FCM, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,) {
    this.menu.swipeEnable(false);
    this.userDetails  = JSON.parse(localStorage.getItem('userProvider'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AkunPage');
  }
  backToWelcome(){
    this.navCtrl.setRoot(LoginPage);
   }

  logout(){
     //Api Token Logout
     this.fcm.unsubscribeFromTopic('tawaran');
     localStorage.clear();
      setTimeout(()=> this.backToWelcome(), 1000);
   }
}
