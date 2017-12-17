import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatusService } from '../services/status.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private router:Router,
        private statusService:StatusService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (localStorage.getItem('access_token')) {
        //     return true;
        // }

        if (this.statusService.token) {
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}