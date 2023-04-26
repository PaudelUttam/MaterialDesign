import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './appMaterial/material/material.module';
import { ToastrModule } from 'ngx-toastr';

import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { LoginComponent } from './public/login/login.component';
import { TokenInterceptorService } from './shared/services/interceptor/token-interceptor.service';
import { ClientComponent } from './public/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    PostsComponent,
    FooterComponent,
    DialogConfirmationComponent,
    LoginComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
     FormsModule ,ToastrModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
