import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationCancel } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StatusService } from '../../services/status.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private statusService: StatusService,
    private router: Router
  ) {

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   console.log(params);
    //   console.log(this.activatedRoute.snapshot.queryParams['access_token']);
    //   // if (params.access_token) {
    //   //   this.statusService.token = JSON.parse(JSON.stringify(params)).access_token;
    //   //   this._flashMessagesService.show('Login success!', { cssClass: 'alert-success', timeout: 2000 });
    //   //   this.router.navigate(['home']);
    //   //   console.log(params);
    //   // } else {
    //   //   console.log(params);
    //   //   this._flashMessagesService.show('Unable to Process. Redirecting in 1 sec...', { cssClass: 'alert-danger', timeout: 2000 });
    //   //   localStorage.removeItem('code');
    //   //   this.router.navigate(['login']);
    //   // }
    // });

    this.activatedRoute.fragment.subscribe((fragment: string) => {
      console.log(fragment.split('=')[1].split('&')[0]);
      if (fragment) {
        this.statusService.token = fragment.split('=')[1].split('&')[0];
        this._flashMessagesService.show('Login success!', { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['home']);
      } else {
        this._flashMessagesService.show('Unable to Process. Redirecting in 1 sec...', { cssClass: 'alert-danger', timeout: 2000 });
        localStorage.removeItem('code');
        this.router.navigate(['login']);
      }
    });
  }

  ngOnInit() { }

}
