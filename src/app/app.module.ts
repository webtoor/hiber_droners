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
import { DetailTawaranPage } from '../pages/detail-tawaran/detail-tawaran';
import { IkutiPage } from '../pages/ikuti/ikuti';
import { DetailBerjalanPage } from '../pages/detail-berjalan/detail-berjalan';
import { Ionic2RatingModule } from 'ionic2-rating';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { HttpModule } from "@angular/http";


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
    ListPage,
    DetailTawaranPage,
    IkutiPage,
    DetailBerjalanPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(HiberDroners),
    Ionic2RatingModule
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
    ListPage,
    DetailTawaranPage,
    IkutiPage,
    DetailBerjalanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider
  ]
})
export class AppModule {}
