import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.UserProfile && this.authService.UserProfile.id && !this.authService.UserProfile.banned) {
            // logged in so return true
            return true;
        }
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
