import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { SearchService } from '../../services/search.service';
import { Search } from '../../models//search.model';
import { ScrollEvent } from 'ngx-scroll-event';

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

  searchString:string = '';
  searchResults:any = {};
  userPlaylists:any = {};
  userLibrary:any = {};
  librarySize:number;
  currentOffset:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private searchService: SearchService
  ) {
      this.currentOffset = 0;
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
      }, error => {
        console.log(error);
      }
    );
  }

  fetchPlaylists(){
    this.profileService.fetchPlaylists().subscribe(
      result => {
        this.userPlaylists = result;
      }, error => {
        console.log(error);
      }
    );
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

}
