import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

export class AuthGuard implements CanActivate{
    
    constructor(private authService: AuthService, private route: Router) {}
    canActivate(){
        if(this.authService.isLoggedIn()){
            return true;
        }
        this.route.navigate(['/login']);
        return false;
    }
}