import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailTawaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-detail-tawaran',
  templateUrl: 'detail-tawaran.html',
})
export class DetailTawaranPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  subject:any;
  order_id:any;
  constructor(public authService: RestApiProvider, public loadingCtrl: LoadingController, public app: App,public navCtrl: NavController, public navParams: NavParams) {
    this.subject= navParams.get('subject');
    this.order_id= navParams.get('order_id');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailTawaranPage');
  }

  getDetailTawaran(){
    this.showLoader()
    this.authService.getData('api/provider/detail_show/' + this.subject, this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['data'];
        this.loading.dismiss()
      }else{
        this.loading.dismiss()
        localStorage.clear();
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
