import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authSerivce: AuthService
  ) { }

  ngOnInit() {

  }

  onLogin() {
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=56138b8f51b4473fb441c6a7a572b559&response_type=token&redirect_uri=http://localhost:4200/processing?&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-modify-public%20playlist-modify-private%20user-follow-read%20user-follow-modify%20user-library-read%20user-library-modify&show_dialog=true';
  }

}
