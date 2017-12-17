import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logoutHidden:boolean = true;

  constructor(
    private router: Router,
    private statusService: StatusService
  ) {

    statusService.access_token.subscribe(
      (nextValue) => {
        this.logoutHidden = false;
      }
    );

   }

  ngOnInit() {
    
  }

  onLogout(){
    localStorage.clear();
    this.logoutHidden = true;
    this.router.navigate(['/login']);
  }

}
