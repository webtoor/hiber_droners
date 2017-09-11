import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { RegisterPage } from '../register/register'
import { TabsPage } from '../tabs/tabs'


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  loading: any;
  pesan: any;
  penyediaData = { "username": "", "password": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public menu: MenuController, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {

    if (this.penyediaData.username && this.penyediaData.password) {
      this.authService.postData(this.penyediaData, "login").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.penyediaData) {
          this.showLoader();
          localStorage.setItem('penyediaData', JSON.stringify(this.responseData));
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
        else {
          this.pesan = result["text"];
          this.presentToast(this.pesan);
        }
      }, (err) => {
        this.showLoader();
        this.loading.dismiss();
        this.presentToast("Tidak terhubung ke server");
      });
    }
    else {
      this.presentToast("Harus di isi semua");
    }
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authentication...',
      duration: 3000,
    });

    this.loading.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }
  }
