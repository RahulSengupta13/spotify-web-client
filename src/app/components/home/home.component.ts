import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { SearchService } from '../../services/search.service';
import { Search } from '../../models//search.model';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private searchService: SearchService
  ) {

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        if(params.code){
          localStorage.setItem('code', params.code);
          this.authService.requestTokens().subscribe(
            result=>{
              this._flashMessagesService.show('Login success!', { cssClass: 'alert-success', timeout: 2000 });
              console.log(result);
              this.fetchProfile();
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

}
