import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileService {

  constructor(
    private http:HttpClient
  ) { }

  fetchProfile(){
    return this.http.get('https://api.spotify.com/v1/me').map(
      result => {
        console.log(result);
        return result;
      }, error => {
        return error;
      }
    );
  }
}
