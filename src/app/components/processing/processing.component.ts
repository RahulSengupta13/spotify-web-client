import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StatusService } from '../../services/status.service';

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
    private statusService:StatusService,
    private router: Router
  ) {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params.code){
        localStorage.setItem('code', params.code);
        this.authService.requestTokens().subscribe(
          result=>{
            this._flashMessagesService.show('Login success!', { cssClass: 'alert-success', timeout: 2000 });
            this.router.navigate(['home']);
            console.log(result);
          }, error => {
            console.log(error);
            this._flashMessagesService.show('Unable to Process. Redirecting in 1 sec...', { cssClass: 'alert-danger', timeout: 2000 });
            localStorage.removeItem('code');
            this.router.navigate(['login']);
          }
        );
      } else{
        this._flashMessagesService.show('Unable to Process. Redirecting in 1 sec...', { cssClass: 'alert-danger', timeout: 2000 });
        localStorage.removeItem('code');
        this.router.navigate(['login']);
      }
    });

   }

  ngOnInit() {

  }

}
