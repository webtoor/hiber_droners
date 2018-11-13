import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { TawaranPage } from '../tawaran/tawaran';
import { BerjalanPage } from '../berjalan/berjalan';
import { PerformaPage } from '../performa/performa';
import { LoginPage } from '../login/login';
import { RestApiProvider } from '../../providers/rest-api/rest-api';



/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public userDetails : any;
  public responseData: any;

  tab1Root = TawaranPage;
  tab2Root = BerjalanPage;
  tab3Root = PerformaPage;
  
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public authService: RestApiProvider) {
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidEnter() {
    if(!localStorage.getItem('userProvider')){
      this.navCtrl.setRoot(LoginPage);
    }  
    this.getRating();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
  getRating(){
    this.authService.getData('api/provider/get_rating/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.events.publish('rate', this.responseData['data']['total_rating']);
      }else{
       console.log('error')
      }
    }, (err) => {
      console.log('error')
    });
  }

}
