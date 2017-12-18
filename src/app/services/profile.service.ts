import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

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

  fetchPlaylists(){
    return this.http.get('https://api.spotify.com/v1/me/playlists').map(
      result =>{
        console.log(result);
        return result;
      },
      error => {
        return error;
      }
    );
  }

  fetchPlaylistTracks(user_id:string, playlist_id:string){
    return this.http.get('https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id+'/tracks').map(
      result => {
        console.log(result);
        return result;
      },
      error => {
        console.log(error);
        return error;
      }
    );
  }

  fetchPlaylist(user_id:string, playlist_id:string){
    return this.http.get('https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id).map(
      result => {
        console.log(result);
        return result;
      },
      error => {
        console.log(error);
        return error;
      }
    );
  }

}
