import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App  } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';

/**
 * Generated class for the PerformaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-performa',
  templateUrl: 'performa.html',
})
export class PerformaPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any;
  constructor(public app: App, public authService: RestApiProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformaPage');
    this.getOrderFeedback();
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
  
  getOrderFeedback(){
    this.showLoader()
    this.authService.getData('api/provider/order_feedback/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
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

}
