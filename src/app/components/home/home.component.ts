import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { SearchService } from '../../services/search.service';
import { Search } from '../../models//search.model';
import { ScrollEvent } from 'ngx-scroll-event';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  currentUser:User = {
    country:'',
    display_name:'',
    email: '',
    id:'',
    imageUrl:''
  };

  newPlaylist:any = {
    name:'',
    public:true,
    collaborative:false,
    description:''
  }

  searchString:string = '';
  searchResults:any = {};
  userPlaylists:any = {};
  userLibrary:any;
  librarySize:number;
  currentOffset:number;
  closeResult: string;
  playlistModal:NgbModalRef;
  userOwnedPlayists:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private searchService: SearchService,
    private modalService: NgbModal
  ) {
      this.currentOffset = 0;
      this.userLibrary = {};
      this.userOwnedPlayists = [];
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        if(params.code){
          localStorage.setItem('code', params.code);
          this.authService.requestTokens().subscribe(
            result=>{
              this._flashMessagesService.show('Login success!', { cssClass: 'alert-success', timeout: 2000 });
              console.log(result);
              this.fetchProfile();
              this.fetchPlaylists();
              this.fetchLibrary();
            }, error => {
              console.log(error);
            }
          );
        } else{
          this._flashMessagesService.show('Unable to login. Redirecting in 1 sec...', { cssClass: 'alert-danger', timeout: 2000 });
          localStorage.removeItem('code');
          this.router.navigate(['login']);
        }
      });
   }

  ngOnInit() {
    
  }

  fetchProfile(){

    this.profileService.fetchProfile().subscribe(
      result=>{
        let object = JSON.parse(JSON.stringify(result));
        console.log(object);
        this.currentUser.country = object.country;
        this.currentUser.display_name = object.display_name;
        this.currentUser.email = object.email;
        this.currentUser.id = object.id;
        this.currentUser.imageUrl = object.images[0].url;
        localStorage.setItem('uid',this.currentUser.id);
      }, error => {
        console.log(error);
      }
    );
  }

  fetchPlaylists(){
    this.profileService.fetchPlaylists().subscribe(
      result => {
        this.userPlaylists = result;
        this.filterUserOwnedPlaylists(this.userPlaylists.items);
      }, error => {
        console.log(error);
      }
    );
  }

  filterUserOwnedPlaylists(playlists:any){
    let i:number = 0;
    for(i=0;i<playlists.length;i++){
      if(playlists[i].owner.id == this.currentUser.id){
        this.userOwnedPlayists.push(playlists[i]);
      }
    }
    console.log(this.userOwnedPlayists);
  }

  searchMusic(){
    this.searchService.search(this.searchString).subscribe(
      result => {
        this.searchResults = result;
        console.log(this.searchResults);
      }, error => {
        this.searchResults = {};
      }
    );
  }

  fetchLibrary(){
    this.profileService.fetchLibrary().subscribe(
      result => {
        this.userLibrary = result;
        this.librarySize = this.userLibrary.total;
      }, error => {
        console.log(error);
      }
    );
  }

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingBottom) {
      if(this.currentOffset<this.librarySize){
        let res = this.librarySize - this.currentOffset;
        if(res%20 == 0){
          this.currentOffset += 20;
        } else {
          this.currentOffset += res%20;
        }
        this.profileService.fetchLibrary(this.currentOffset).subscribe(
          result => {
            let res:any = {};
            res = result;
            this.userLibrary.items = this.userLibrary.items.concat(res.items);
          }, error => {
            console.log(error);
          }
        );
      }
    }
    if (event.isWindowEvent) {
    }
 
  }

  addToLibrary(trackId:string){
    this.profileService.checkTrackInLibrary(trackId).subscribe(
      result => {
        if(!result[0]){
          this.profileService.addTrackToLibrary(trackId).subscribe(
            result => {
              this._flashMessagesService.show('track added to library!', { cssClass: 'alert-success', timeout: 2000 });
              this.fetchLibrary();
            }, error => {
              this._flashMessagesService.show('could not add to library. Please try again!', { cssClass: 'alert-danger', timeout: 2000 });
            }
          );
        } else {
          this._flashMessagesService.show('track already in library.', { cssClass: 'alert-info', timeout: 2000 });
        }
      }, error => {

      }
    );
  }

  deleteFromLibrary(trackId:string){
    this.profileService.deleteTrackFromLibrary(trackId).subscribe(
      result => { 
        this._flashMessagesService.show('track removed from library!', { cssClass: 'alert-success', timeout: 2000 });
        this.fetchLibrary();
        this.currentOffset = 0;
      },
      error => {
        this._flashMessagesService.show('Could not remove. Please try again!', { cssClass: 'alert-danger', timeout: 2000 });
      }
    );
  }

  open(content) {
    this.playlistModal = this.modalService.open(content);
  }

  onSubmitNewPlaylist({value,valid}:{value:any,valid:boolean}){
    if(valid){
      this.profileService.createPlaylist(this.newPlaylist,this.currentUser.id).subscribe(
        result => {
          console.log(result);
          this._flashMessagesService.show('playlist created, add tracks to it!', { cssClass: 'alert-success', timeout: 2000 });
          this.playlistModal.close();
          this.userPlaylists = {};
          this.userOwnedPlayists = {};
          this.fetchPlaylists();
        }, error => {
          console.log(error);
          this._flashMessagesService.show('playlist created, add tracks to it!', { cssClass: 'alert-danger', timeout: 2000 });
        }
      );
    }
  }

  checkInLibrary(track_id:string){
    this.profileService.checkTrackInLibrary(track_id).subscribe(
      result=>{
        if(!result[0]){
          return false;
        } else{
          return true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onAddToPlaylist(playlist_name:string, playlist_id:string, track_uri:string){
    this.profileService.addTrackToPlaylist(playlist_id,track_uri,this.currentUser.id).subscribe(
      result => {
        this._flashMessagesService.show('track added to '+playlist_name, { cssClass: 'alert-success', timeout: 2000 });
        this.userPlaylists = {};
        this.fetchPlaylists();
      }, error =>{
        this._flashMessagesService.show('error adding track, please try again', { cssClass: 'alert-danger', timeout: 2000 });
      }
    );
  }

}
