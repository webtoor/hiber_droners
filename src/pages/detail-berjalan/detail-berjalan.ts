import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LoginPage } from '../login/login';


/**
 * Generated class for the DetailBerjalanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail-berjalan',
  templateUrl: 'detail-berjalan.html',
})
export class DetailBerjalanPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  subject:any;
  order_id:any;
  map:any;
  outputs:any;
  area : any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(public authService: RestApiProvider, public loadingCtrl: LoadingController, public app: App,public navCtrl: NavController, public navParams: NavParams) {
    this.subject= navParams.get('subject');
    this.order_id= navParams.get('id');
    const data = JSON.parse(localStorage.getItem('userProvider'));
    this.userDetails = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailBerjalanPage');
    this.getDetailTawaran();
  }

  getDetailTawaran(){
    this.showLoader()
    this.authService.getData('api/provider/detail_show/' + this.order_id, this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['polygon'];
          
    let LatLng = new google.maps.LatLng(this.responseData['polygon'][0]['latitude'], this.responseData['polygon'][0]['longitude']);

    let mapOptions = {
      center:LatLng,
      zoom:17,
      MapTypeID: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var arr = this.responseData['polygon'];
      var cords = []
      for (var i = 0; i < arr.length; i++) {
        cords.push(new google.maps.LatLng(parseFloat(this.responseData['polygon'][i]['latitude']), parseFloat(this.responseData['polygon'][i]['longitude'])));
      }
      //console.log(cords)
        var polygons = new google.maps.Polygon({
           paths: cords,
           map: this.map,
           strokeColor: '#000',
           strokeOpacity: 0.8,
           strokeWeight: 6,
           fillColor: 'green',
           fillOpacity: 0.35,
         });
         this.map.getBounds(cords);
         cords = [];

         this.outputs = []
         for(var j=0; j < this.responseData['output'].length; j++){
          if(this.responseData['output'][j]['output_id'] == '1'){
            this.outputs.push('Video')
          }else if(this.responseData['output'][j]['output_id'] == '2'){
            this.outputs.push ('Foto')
          }else if(this.responseData['output'][j]['output_id'] == '3'){
            this.outputs.push('Peta')
          }else if(this.responseData['output'][j]['output_id'] == '4'){
            this.outputs.push('Lain-lain')
          }
         }
         console.log(this.outputs)
         var luasArea = google.maps.geometry.spherical.computeArea(polygons.getPath());
         this.area = luasArea.toFixed(2)
         console.log(this.area)
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
