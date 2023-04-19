import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './public/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { 
    path: 'home', component:HomeComponent, canActivate: [AuthGuard]
  },
  {
    path:'posts', component:PostsComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
