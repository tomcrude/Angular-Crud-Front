import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from './shared/shared.module';
import { ReviewModule } from './reviews/review.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ReviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
