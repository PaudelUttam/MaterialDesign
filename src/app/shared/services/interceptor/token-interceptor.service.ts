import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

constructor(private injector: Injector) {
    
}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(AuthService);
        let authReq = this.addTokenHeader(req, authService.getToken());
        return next.handle(authReq)
        .pipe(
            catchError(erroData=>{
                if(erroData.status === 401){
                    //need to logout but due refresh token 
                    return this.handleRefreshToken(req, next);
                }
                return throwError(erroData);
            })
        );
    }

    handleRefreshToken(req: HttpRequest<any>, next: HttpHandler){
        let authService = this.injector.get(AuthService);
        return authService.generateRefreshToken()
            .pipe(
                switchMap((data:any)=>{
                    authService.saveTokens(data);
                    return next.handle(this.addTokenHeader(req, data.jwtToken))
                }),
                catchError(errorData =>{
                    authService.logout();
                    return throwError(errorData);
                })
            );
    }

    addTokenHeader(req: HttpRequest<any>, token:any){
        return req.clone({
            headers: req.headers.set('Authorization', 'bearer' + token)
        });
    }
}