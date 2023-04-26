import { Component } from '@angular/core';
import {ReviewService} from "../../services/services"
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private service:ReviewService){}

  review = [{
    title: "",
    description: "",
    id: ""
  }]

  message:String = ""

  onDestroy$: Subject<boolean> = new Subject()

  ngOnInit(){

  this.service.getAllReviews().pipe(takeUntil(this.onDestroy$)).subscribe({

  next: (res:any) => {this.review = res},
  error: (e:any) => {if (e){this.message = "An error has occurred."}}})}

  ngOnDestroy(){
    this.onDestroy$.next(true)
  }

}
