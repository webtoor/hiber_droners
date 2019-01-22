import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, LoadingController, ToastController, Events  } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RestApiProvider } from '../../providers/rest-api/rest-api'
/* import { Push, PushObject, PushOptions } from '@ionic-native/push';
 */
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  loading: any;
  userProviders = { "email": "", "password": "", "device_token" : "" };
  constructor(public fcm: FCM, public navCtrl: NavController, public navParams: NavParams, public authService: RestApiProvider, public menu: MenuController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public events: Events) {
    this.menu.swipeEnable(false);
  }

  ionViewDidEnter() {
    this.pushSetup()
  }

  /* pushSetup(){
    const options: PushOptions = {
      android: {
        senderID : '20786705039'
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   
   pushObject.on('registration').subscribe((registration: any) => {
    console.log('Device registered', registration)
    this.userProviders.device_token = registration['registrationId']
   }
  );
  } */

  pushSetup(){
    this.fcm.getToken().then(token => {
      console.log(token);
      this.userProviders.device_token = token;
    });
  }

  login(){
    console.log(this.userProviders)
    if (this.userProviders.email && this.userProviders.password) {
      this.authService.postData(this.userProviders, "login_provider", "").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData["access_token"]) {
          this.showLoader();
          this.events.publish('email', this.responseData.email);
          localStorage.setItem('userProvider', JSON.stringify(this.responseData));
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage);
        }
        else{
         this.presentToast('Invalid credentials' + "\n" +  this.responseData['message']);
        }
      }, (err) => {
        this.showLoader();
        this.loading.dismiss();
        this.presentToast("Tidak terhubung ke server");
      });
    }
    else {
      this.presentToast("The email field is required \n The password field is required");
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

}
