import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, App, LoadingController } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';
import { DetailTawaranPage } from '../detail-tawaran/detail-tawaran';
import { IkutiPage } from '../ikuti/ikuti';
import { FilterPage } from '../filter/filter';


/**
 * Generated class for the TawaranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-tawaran',
  templateUrl: 'tawaran.html',
})
export class TawaranPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any;
  filter:any;
  constructor(public modalCtrl: ModalController, public loadingCtrl: LoadingController, public app: App, public navCtrl: NavController, public navParams: NavParams, public authService: RestApiProvider) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
    console.log(this.userDetails)
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad TawaranPage');
    if(localStorage.getItem('userProvider')){
      this.filter = '0';
      this.getTawaran();
    }else if(!localStorage.getItem('userProvider')){
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.navCtrl.setRoot(LoginPage);
    } 
  }

  detail(id:any, subject:any){
    console.log(id)
    //let nav = this.app.getRootNav();
    this.navCtrl.push(DetailTawaranPage, {
    id : id,
    subject : subject
    });
  }

  getTawaran(){
    this.showLoader()
    this.authService.getData('api/provider/tawaran_show/' + this.userDetails['id'] + '/' + this.filter, this.userDetails['access_token']).then((result)=>{
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

  ikutiModal(id:any, subject:any) {
    let modal = this.modalCtrl.create(IkutiPage, { order_id: id, subject:subject }, {cssClass: 'select-modal' });
    modal.onDidDismiss(data => {
    
    })
    modal.present();
  }

  filterSort(){
    console.log('filter');
    let modal = this.modalCtrl.create(FilterPage, { provider_id:this.userDetails['id'] }, {cssClass: 'select-modal' });
    modal.onDidDismiss(data => {
      if(data){
        this.filter = data['kode'];
        this.getTawaran();
        console.log(this.filter)
      }

    })
    modal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTawaran();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
