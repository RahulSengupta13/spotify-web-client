import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(
    private http:HttpClient
  ) { }

  search(searchString:string){
    searchString = searchString.replace(' ','%20');
    let searchUrl:string = 'https://api.spotify.com/v1/search?q='+searchString+'&type=artist,album,track&limit=5'; 
    return this.http.get(searchUrl).map(
      result => {
        return result;
      }, error =>{
        return error;
      }
    );
  }

}
