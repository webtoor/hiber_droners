import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
/* import { Push, PushObject, PushOptions } from '@ionic-native/push';
 */
import { AkunPage } from '../pages/akun/akun';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { FCM } from '@ionic-native/fcm';
import { Autostart } from '@ionic-native/autostart';


declare var FCMPlugin: any;
@Component({
  templateUrl: 'app.html'
})
export class HiberDroners {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  userDetails : any;
  emails :any;
  pages: Array<{title: string, icon:any, component: any}>;
  rate :string;
  constructor(private autostart: Autostart, private alertCtrl: AlertController, public fcm: FCM,public platform: Platform, public events: Events,  public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.userDetails = JSON.parse(localStorage.getItem('userProvider'));
    if(this.userDetails){
    this.emails = this.userDetails.email;
    }
    events.subscribe('email', (email) => {
      this.emails = email;
      //console.log(this.emails);
    });

    events.subscribe('rate', (rate) => {
      //console.log(rate)
    if(rate == parseInt(rate)){
      this.rate = rate + '.0'
    }else{
      this.rate = rate 
    }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Akun', icon: 'contact', component: AkunPage },
      { title: 'Hubungi kami', icon: 'mail', component: HubungiPage },
      { title: 'Bantuan', icon: 'help-circle', component: BantuanPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.autostart.enable(); 
      this.pushSetup();
      setTimeout(() => {
       this.splashScreen.hide();
        }, 100);
        this.statusBar.backgroundColorByHexString('#2A2C43');
        this.statusBar.styleBlackTranslucent();
      
    });
  }

  pushSetup(){
    if(this.platform.is('cordova')){    
    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background");
        if(data.action == 'tawaran'){
          this.nav.setRoot(TabsPage);
        }
        if(data.action == 'bekerja'){
          this.nav.setRoot(TabsPage, {
            bekerja : 1,
          });
        }
      } else {
        console.log("Received in foreground");
        if(data.action == 'tawaran'){
          let alert = this.alertCtrl.create({
            title: data.title,
            subTitle: data.body,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.nav.setRoot(TabsPage);
                }
              }
            ]
          });
          alert.present();
        }
        if(data.action == 'bekerja'){
          let alert = this.alertCtrl.create({
            title: data.title,
            subTitle: data.body,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.nav.setRoot(TabsPage, {
                    bekerja : 1,
                  });
                }
              }
            ]
          });
          alert.present();
        }
      
      };
    });
  }
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
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
  } */

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
