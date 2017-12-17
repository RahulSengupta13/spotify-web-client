import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders  } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { request } from 'http';

@Injectable()
export class AuthService {

  
  private client_id ='56138b8f51b4473fb441c6a7a572b559';
  private client_secret = 'b738dafbc111485eaa16b5efc34bf132';
  private access_token:string;
  private refresh_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';

  constructor(
    private http:HttpClient
  ) { 

  }

  getEncoded(){
    return this.encoded;
  }

  getCode(){
    return localStorage.getItem('code');
  }

  requestTokens(){

    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + this.encoded);
    headers = headers.append('Content-Type','application/x-www-form-urlencoded');
    headers = headers.append('Accept','application/json');

    let params = new HttpParams();
    params = params.append('grant_type', 'authorization_code');
    params = params.append('code', this.getCode());
    params = params.append('redirect_uri', 'http://localhost:4200/home');

    return this.http.post('https://accounts.spotify.com/api/token',null,
      {
        headers: headers,
        params: params
      }).map(result => {
        return result;
      }, error => {
        this.handleError;
      });

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw('Email already in use. Please try again.');
  }

}
