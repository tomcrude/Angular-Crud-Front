import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CreateEditComponent } from './views/create-edit/create-edit.component';
import { HomeComponent } from './views/home/home.component';
import { RouterModule } from '@angular/router';
import { ReviewDetailsComponent } from './views/review-details/review-details.component';
import { ReviewsComponent } from './components/review/review.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReviewDetailsComponent,
    ReviewsComponent,
    HeaderComponent,
    CreateEditComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ReviewModule { }
