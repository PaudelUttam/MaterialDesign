import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

export class RoleGuard implements CanActivate{
    currentRole: any;
   
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if(this.authService.isLoggedIn()){
            this.currentRole = this.authService.getRoleByToken(this.authService.getToken());
            this.authService.haveAccess(this.currentRole,route.url[0].path)
            return true
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}