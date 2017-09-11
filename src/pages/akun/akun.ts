import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome'
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

/**
 * Generated class for the AkunPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-akun',
  templateUrl: 'akun.html',
})
export class AkunPage {
  public penyediaDetails : any;
  public responseData: any;
  public dataSet : any;
  penyediaPostData = {"user_id":"", "token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.swipeEnable(false);
    const data = JSON.parse(localStorage.getItem('penyediaData'));
    this.responseData = data.penyediaData;
    console.log(this.responseData);
    this.penyediaDetails = data.penyediaData;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AkunPage');
  }
  backToWelcome(){
   this.navCtrl.setRoot(WelcomePage);
  }
  logout(){
    //Api Token Logout
    localStorage.clear();
     setTimeout(()=> this.backToWelcome(), 1000);
  }
}
