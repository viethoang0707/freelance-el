import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CacheService} from '../services/cache.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cache: CacheService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.cache.UserProfile && this.cache.UserProfile.id && !this.cache.UserProfile.banned) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
