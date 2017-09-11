import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { LoginPage } from '../login/login'
/**
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  responseData:any;
  loading: any;
  pesan:any;
  penyediaData = {"username":"", "mPhone":"","email":"","password":""};


  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public menu: MenuController) {
    this.menu.swipeEnable(false);
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  daftar() {

       if(this.penyediaData.username && this.penyediaData.mPhone && this.penyediaData.email && this.penyediaData.password){
     this.authService.postData(this.penyediaData, "signup").then((result) => {
       this.responseData = result;
       console.log(this.responseData);
       if(this.responseData.userData){
         this.showLoader();
      localStorage.setItem('penyediaData', JSON.stringify(this.responseData) );
      this.loading.dismiss();
      this.navCtrl.pop(); }
      else{
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

   showLoader(){
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
  login(){
    this.navCtrl.push(LoginPage)
  }
  }
