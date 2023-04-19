import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Login } from "../../models/login.model";

@Injectable({
    providedIn:'root'
})
export class AuthService{
apiUrl = "";
tokenResponse: any;
private updateMenu$ = new Subject<void>();

constructor(private http: HttpClient, private router: Router) {}

login(loginModel: Login){
    return this.http.post(this.apiUrl,loginModel)
}
 isLoggedIn(){
    if(localStorage.getItem('token')!=null){
        return true;
    }
    return false;
 }

 getToken(){
    return localStorage.getItem('token') || "";
 }
 getRefreshToken(){
    return localStorage.getItem('refreshToken')|| '';
 }

 generateRefreshToken(){
    let input = {
        'jwtToken': this.getToken(),
        'refreshToken': this.getRefreshToken()
    }
    return this.http.post(this.apiUrl+"/refreshToken", input);
 }

 saveTokens(tokenData:any){
    localStorage.setItem('token', tokenData.jwtToken);
        localStorage.setItem('refreshToken', tokenData.refreshToken);
 }

 haveAccess(roleId:any, menu: any){
    return this.http.get(this.apiUrl + "/getMenuByRole" + roleId + '&menu='+ menu);
 }

get updateMenu(){
    return this.updateMenu$;
}

 logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
 }

 getRoleByToken(token:any){
    let _token = token.split(".")[1];
    this.tokenResponse = JSON.parse(atob(_token));
    return this.tokenResponse.role;
 }

 getMenuByRoleId(roleId:any){
    return this.http.get(this.apiUrl + "/getMenuByRole" + roleId);
 }
}