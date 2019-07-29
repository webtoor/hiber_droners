import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient,HttpHeaders } from '@angular/common/http';

//let apiUrl = "http://192.168.43.107:8000/";
//let apiUrl = "http://hiber.herokuapp.com/"
let apiUrl = "http://127.0.0.1:8000/";
//let apiUrl = "http://hiber.eidaramata.com/public/";



/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestApiProvider {
  data
  constructor(public http: Http, public httpClients: HttpClient) {
    //console.log('Hello AuthServiceProvider Provider');
  }
  postData(credentials, type, access_token){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      headers.append('Authorization', 'Bearer ' + access_token);
      let options = new RequestOptions({ headers:headers});
      //console.log(options)
      this.http.post(apiUrl+type, credentials, options).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });

  }

  postDatas(credentials, type, access_token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept' : 'application/json',
        'Authorization': 'Bearer ' + access_token
      })
    };
    return this.httpClients.post(apiUrl+type, credentials, httpOptions)
    .pipe(
      
    );
  }

  getData(type, access_token){
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');
      headers.append('Authorization', 'Bearer ' + access_token);
      let options = new RequestOptions({ headers:headers});
      //console.log(options)
      this.http.get(apiUrl + type, options)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
