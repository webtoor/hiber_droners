import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';

/**
 * Generated class for the BerjalanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-berjalan',
  templateUrl: 'berjalan.html',
})
export class BerjalanPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any;
  public theState:boolean = false;
  constructor(public app: App ,public loadingCtrl: LoadingController,public authService: RestApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerjalanPage');
    this.getBerjalanIkuti();
  }

  change(){
    if(this.theState == false){
      this.getBerjalanIkuti();
    }else if(this.theState == true){
      this.getBerjalanKerja();
    }else{
      this.getBerjalanIkuti();
    }
    console.log(this.theState)
  }

  getBerjalanIkuti(){
    this.showLoader()
    this.authService.getData('api/provider/berjalan_ikuti_show/' + this.userDetails['id'] , this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['data'];
        this.loading.dismiss()
      }else{
        this.loading.dismiss()
        //localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
      }
    }, (err) => {
      this.loading.dismiss()
    });
  }

  getBerjalanKerja(){
    this.showLoader()
    this.authService.getData('api/provider/berjalan_kerja_show/' + this.userDetails['id'] , this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['data'];
        this.loading.dismiss()
      }else{
        this.loading.dismiss()
        //localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
      }
    }, (err) => {
      this.loading.dismiss()
    });
  }

  backToWelcome(){
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
   }

   showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading..',
    });

    this.loading.present();
  }
}
