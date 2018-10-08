import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HiberDroners } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { TawaranPage } from '../pages/tawaran/tawaran';
import { BerjalanPage } from '../pages/berjalan/berjalan';
import { PerformaPage } from '../pages/performa/performa';
import { AkunPage } from '../pages/akun/akun';
import { HubungiPage } from '../pages/hubungi/hubungi';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestApiProvider } from '../providers/rest-api/rest-api';

@NgModule({
  declarations: [
    HiberDroners,
    HomePage,
    TawaranPage,
    BerjalanPage,
    TabsPage,
    PerformaPage,
    AkunPage,
    HubungiPage,
    BantuanPage,
    LoginPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(HiberDroners),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HiberDroners,
    HomePage,
    TawaranPage,
    BerjalanPage,
    TabsPage,
    PerformaPage,
    AkunPage,
    HubungiPage,
    BantuanPage,
    LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider
  ]
})
export class AppModule {}
