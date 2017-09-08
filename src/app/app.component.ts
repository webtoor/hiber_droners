import { Component, ViewChild} from '@angular/core';
import { Platform,  Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AkunPage } from '../pages/akun/akun';
import { BantuanPage } from '../pages/bantuan/bantuan';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  pages: Array<{title: string, icon: string,  component: any}>;
  petas: Array<{title: string, icon: string,  component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // ngfor navigation push
   this.pages = [
     { title: 'Akun', icon: 'contact', component: AkunPage },
     /*{ title: 'Proyek', icon: 'cart', component: Proyek1Page },
     { title: 'Hubungi kami', icon: 'mail', component: HubkamiPage }, */
     { title: 'Bantuan', icon: 'help-circle', component: BantuanPage }
    ];

    // setRoot
    /*this.petas = [
     { title: 'Peta', icon: 'pin', component: AkunPage }
   ];*/

  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      setTimeout(() => {
        this.splashScreen.hide();
        }, 100);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
 /*openPagesr(peta) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   this.nav.setRoot(peta.component);
  }*/
}
