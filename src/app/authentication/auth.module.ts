import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RegisterComponent} from "./views/register/register.component"
import { LoginComponent } from './views/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    RegisterComponent,
    LoginComponent,
    AuthComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
