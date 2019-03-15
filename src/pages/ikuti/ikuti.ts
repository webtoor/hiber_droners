import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, LoadingController, App, ToastController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the IkutiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-ikuti',
  templateUrl: 'ikuti.html',
})
export class IkutiPage {
  subject:any;
  order_id:any;
  dataBidding = { "order_id" : "", "offered_price" : "", "proposal_by" : "", "comment" : "" };
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  constructor(private toastCtrl: ToastController, public loadingCtrl: LoadingController, public app: App,public authService: RestApiProvider, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.subject= navParams.get('subject');
    this.order_id= navParams.get('order_id');
    console.log(this.order_id)
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IkutiPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  bidding(order_id){
    this.showLoader();
    this.dataBidding.order_id = order_id;
    this.dataBidding.proposal_by = this.userDetails['id']
    console.log(this.dataBidding)
    if (this.dataBidding.offered_price) {
      this.authService.postData(this.dataBidding, "api/provider/bidding",  this.userDetails['access_token']).then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData["success"] == true) {
          this.loading.dismiss();
          this.navCtrl.setRoot(TabsPage, {
          });
        }else if(this.responseData["message"] == "double"){
          this.loading.dismiss()
          this.presentToast("Anda sudah mengikuti project ini!!");
        }
        else{
        this.loading.dismiss()
        localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast("Tidak terhubung ke server");
      });
    }
    else {
      this.loading.dismiss();
      this.presentToast("Harga penawaran harus diisi !!");
    }
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
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
