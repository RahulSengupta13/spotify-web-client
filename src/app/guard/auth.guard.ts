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

        if (this.statusService.token) {
            return true;
        }
        
        this.router.navigate(['/login']);
        return false;
    }
}