import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BerjalanPage } from '../pages/berjalan/berjalan';
import { PerformaPage } from '../pages/performa/performa';
import { TawaranPage } from '../pages/tawaran/tawaran';
import { TabsPage } from '../pages/tabs/tabs';
import { AkunPage } from '../pages/akun/akun';
import { BantuanPage } from '../pages/bantuan/bantuan';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';






import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from "@angular/http";


@NgModule({
  declarations: [
    MyApp,
    BerjalanPage,
    PerformaPage,
    TawaranPage,
    TabsPage,
    AkunPage,
    BantuanPage,
    RegisterPage,
    LoginPage,
    WelcomePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BerjalanPage,
    PerformaPage,
    TawaranPage,
    TabsPage,
    AkunPage,
    BantuanPage,
    RegisterPage,
    LoginPage,
    WelcomePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
