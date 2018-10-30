import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

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
  constructor(public authService: RestApiProvider, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.subject= navParams.get('subject');
    this.order_id= navParams.get('order_id');
    console.log(this.order_id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IkutiPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  bidding(order_id){
    console.log(order_id)
  }
}
