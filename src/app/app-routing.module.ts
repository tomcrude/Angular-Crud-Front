import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './authentication/views/main/main.component';
import { RegisterComponent } from './authentication/views/register/register.component';
import { LoginComponent } from './authentication/views/login/login.component';
import { HomeComponent } from './reviews/views/home/home.component';
import { CreateEditComponent } from './reviews/views/create-edit/create-edit.component';
import { ErrorComponent } from './shared/views/error/error.component';
import { ReviewDetailsComponent } from './reviews/views/review-details/review-details.component';

import {ReviewsGuard} from "./reviews/guards/reviews.guard"
import {AuthGuard} from "./authentication/guards/auth.guard"


const routes: Routes = [
  {path: "", component:MainComponent,canActivate:[AuthGuard]},
  {path: "register", component:RegisterComponent,canActivate:[AuthGuard]},
  {path: "logIn", component:LoginComponent,canActivate:[AuthGuard]},

  {path: "home", component:HomeComponent,canActivate:[ReviewsGuard]},
  {path: "review/:id", component:ReviewDetailsComponent,canActivate:[ReviewsGuard]},
  {path: "review/edit/create/:id", component:CreateEditComponent,canActivate:[ReviewsGuard]},

  {path: "**", component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
