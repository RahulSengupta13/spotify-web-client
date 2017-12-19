import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import { Observable } from 'rxjs/Observable';

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    let playlist_id:string = this.activatedRoute.snapshot.params['pid'];
    let user_id:string = this.activatedRoute.snapshot.params['oid'];
    this.currentUserId = localStorage.getItem('uid');
    if(this.currentUserId == user_id) this.deleteHidden = false; else this.deleteHidden = true;
    this.fetchPlaylist(user_id,playlist_id);
    this.fetchTracks(user_id,playlist_id);
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

}
