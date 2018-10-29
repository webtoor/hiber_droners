import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

import { AkunPage } from '../pages/akun/akun';
import { LoginPage } from '../pages/login/login';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { BantuanPage } from '../pages/bantuan/bantuan';



@Component({
  templateUrl: 'app.html'
})
export class HiberDroners {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  userDetails : any;
  emails :any;
  pages: Array<{title: string, icon:any, component: any}>;

  constructor(public platform: Platform, public events: Events,  public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.userDetails = JSON.parse(localStorage.getItem('userProvider'));
    if(this.userDetails){
    this.emails = this.userDetails.email;
    }
    events.subscribe('email', (email) => {
      this.emails = email;
      //console.log(email);
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
      setTimeout(() => {
        this.splashScreen.hide();
        }, 100);
        this.statusBar.backgroundColorByHexString('#2A2C43');
        this.statusBar.styleBlackTranslucent();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
