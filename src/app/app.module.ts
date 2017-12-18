import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { StatusService } from './services/status.service';
import { SearchService } from './services/search.service';

import {AuthGuard} from './guard/auth.guard';

//routes for this application
const appRoutes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view-playlist/:oid/:pid',
    component: ViewComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ViewComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ProfileService,
    AuthGuard,
    SearchService,
    StatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
