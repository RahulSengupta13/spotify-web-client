import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  tracks:any = {};
  playlist:any = {};
  currentUserId:string;
  deleteHidden:boolean;
  playlist_id:string;
  user_id:string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.playlist_id = this.activatedRoute.snapshot.params['pid'];
    this.user_id = this.activatedRoute.snapshot.params['oid'];
    this.currentUserId = localStorage.getItem('uid');
    if(this.currentUserId == this.user_id) this.deleteHidden = false; else this.deleteHidden = true;
    this.fetchPlaylist(this.user_id,this.playlist_id);
    this.fetchTracks(this.user_id,this.playlist_id);
  }

  fetchPlaylist(user_id:string,playlist_id:string){
    this.profileService.fetchPlaylist(user_id,playlist_id).subscribe(
      result => {
        this.playlist = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchTracks(user_id:string,playlist_id:string){
    this.profileService.fetchPlaylistTracks(user_id,playlist_id).subscribe(
      result => {
        this.tracks = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteFromPlaylist(track_uri:string){
    this.profileService.deleteTrackFromPlaylist(this.playlist_id,track_uri,this.user_id).subscribe(
      result => {
        this._flashMessagesService.show('track removed from playlist!', { cssClass: 'alert-success', timeout: 2000 });
        this.tracks = {};
        this.fetchTracks(this.user_id,this.playlist_id);
      }, error => {
        this._flashMessagesService.show('could not delete track, please try again', { cssClass: 'alert-danger', timeout: 2000 });
      }
    );
  }
  
  unFollowPlaylist(playlist_id:string){
    this.profileService.unfollowPlaylist(this.user_id,this.playlist_id).subscribe(
      result => {
        this._flashMessagesService.show('playlist unfolowed', { cssClass: 'alert-success', timeout: 2000 });
      }, error => {
        this._flashMessagesService.show('error, please try again', { cssClass: 'alert-danger', timeout: 2000 });
      }
    );
  }

}
