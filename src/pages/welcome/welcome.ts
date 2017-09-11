import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register'
import { LoginPage } from '../login/login'
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
     this.menu.swipeEnable(false);
     if(localStorage.getItem('penyediaData')){
       this.navCtrl.setRoot(TabsPage);
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  daftar(){
    this.navCtrl.push(RegisterPage);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }

}
