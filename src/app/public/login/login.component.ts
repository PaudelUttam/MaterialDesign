import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  hide = true; //password visible or not
  responseData!: any;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]),
      isRemember: new FormControl('')
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    const loginModel: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      isRemember: this.loginForm.get('isRemember')?.value
    };``
    this.authService.login(loginModel).subscribe(result=>{
      if(result != null){
        this.responseData = result;
        localStorage.setItem('token', this.responseData.jwtToken);
        localStorage.setItem('refreshToken', this.responseData.refreshToken);
        this.authService.updateMenu.next();
        this.route.navigate(['/'])
      }
    })
    localStorage.setItem('user', this.loginForm.value);
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
