import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BerjalanPage } from '../pages/berjalan/berjalan';
import { PerformaPage } from '../pages/performa/performa';
import { TawaranPage } from '../pages/tawaran/tawaran';
import { TabsPage } from '../pages/tabs/tabs';
import { AkunPage } from '../pages/akun/akun';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    BerjalanPage,
    PerformaPage,
    TawaranPage,
    TabsPage,
    AkunPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BerjalanPage,
    PerformaPage,
    TawaranPage,
    TabsPage,
    AkunPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
