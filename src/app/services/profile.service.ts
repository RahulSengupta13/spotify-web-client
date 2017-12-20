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

  fetchLibrary(offset:number=0){
    return this.http.get('https://api.spotify.com/v1/me/tracks?offset='+offset).map(
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

  checkTrackInLibrary(id:string){
    return this.http.get('https://api.spotify.com/v1/me/tracks/contains?ids='+id).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

  addTrackToLibrary(id:string){
    let ids = {
      "ids":[id]
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.put('https://api.spotify.com/v1/me/tracks',ids,{headers:headers}).map(
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

  deleteTrackFromLibrary(id:string){
    let ids = {
      "ids":[id]
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.delete('https://api.spotify.com/v1/me/tracks?ids='+id).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

  createPlaylist(playlist:any,user_id:string){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.post('https://api.spotify.com/v1/users/'+user_id+'/playlists',playlist,{headers:headers}).map(
      result => {
        console.log(result);
        return result;
      },
      error => {
        return error;
      }
    );
  }

  addTrackToPlaylist(playlist_id:string,track_uri:string,user_id:string){
    let uris = {
      "uris":[track_uri]
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.post('https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id+'/tracks',
      uris,
      {headers:headers}).map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

  deleteTrackFromPlaylist(playlist_id:string,track_uri:string,user_id:string){
    let uris = {
      "uris":[track_uri]
    };
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    return this.http.request('delete','https://api.spotify.com/v1/users/'+user_id+'/playlists/'+playlist_id+'/tracks',
      {
        body: uris,
        headers: headers
      }).map(
        result => {
          console.log(result);
          return result;
        }, error => {
          console.log(error);
          return error;
        }
      );
  }

  unfollowPlaylist(owner_id:string, playlist_id:string){
    return this.http.delete('https://api.spotify.com/v1/users/'+owner_id+'/playlists/'+playlist_id+'/followers').map(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }

}
