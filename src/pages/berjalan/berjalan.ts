import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App, AlertController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';
import { DetailBerjalanPage } from '../detail-berjalan/detail-berjalan';

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
  public itemx : any;
  cancels :any =  { "id" : ""}

  loading:any;
  public theState:boolean = false;
  constructor(public alertCtrl : AlertController, public app: App ,public loadingCtrl: LoadingController,public authService: RestApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerjalanPage');
    if(this.navParams.data["bekerja"] == "1"){
      this.theState = true
      this.getBerjalanKerja();
    }else{
      this.getBerjalanIkuti();
    }
    console.log(this.navParams.data)
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
      console.log(this.responseData['data']);
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

  getBerjalanKerja(){
    this.showLoader()
    this.authService.getData('api/provider/berjalan_kerja_show/' + this.userDetails['id'] , this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData['data']);
      if(this.responseData['success'] == true){
        this.itemx = this.responseData['data'];
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

  detail(id:any, subject:any){
    console.log(id)
    /* //let nav = this.app.getRootNav();
    this.navCtrl.push(DetailBerjalanPage, {
    id : id,
    subject : subject
    }); */
    let nav = this.app.getRootNav();
    nav.push(DetailBerjalanPage, {
      id : id,
      subject : subject
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

  Cancels(id:any, subject : any){
    this.cancels.id = id;
    console.log(this.cancels)
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Apakah anda yakin untuk berhenti mengikuti' + subject + '?',
      buttons: [
        {
          text: 'Oke',
          handler: () => {
              this.authService.postData(this.cancels, "api/provider/cancel_bid", this.userDetails['access_token']).then((result) => {
              this.responseData = result;
              console.log(this.responseData);
              if(this.responseData['success'] == true){
               this.getBerjalanIkuti();
              }else{
                 localStorage.clear();
                setTimeout(()=> this.backToWelcome(), 1000);  
              }
            });  
          }
        },
        {
          text: 'Kembali',
          handler: () => {
            console.log('Kembali clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
