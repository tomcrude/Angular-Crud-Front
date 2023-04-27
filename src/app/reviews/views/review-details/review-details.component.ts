import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import {ReviewService} from "../../services/services"
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { review } from '../../models/review';

@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.css']
})
export class ReviewDetailsComponent {

  constructor(private service:ReviewService,private activeRoute: ActivatedRoute,private router:Router){}

  onDestroy$: Subject<boolean> = new Subject()

  review:review = {
    img: "",
    title: "",
    description: "",
    user: "",
    id: ""
  }

  reviews =[{
    title: "",
    description: "",
    id: ""
  }]

  token:any

  id = localStorage.getItem("id")

  message:String = ""
  params:any = this.activeRoute.snapshot.paramMap.get('id');

  image:string = "./../../../../assets/images/loading.gif"

  async ngOnInit(){

      this.service.getReview(this.params).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if(res == null){this.router.navigate([`home`])}else {this.review = res; this.image = "https://java-crud-back.onrender.com/images/" + res.id + "-image.png"
        this.service.getUserReviews(res.user,this.params).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {this.reviews = res},
        error: (e:any) => {if (e){this.message = "An error has occurred."}}})}
      },
      error: (e:any) => {if (e){this.message = "An error has occurred."}}})
    }

  delete(){
    this.token = localStorage.getItem("token")

    this.service.deleteReview(this.params,this.token,this.review.user).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if(res.status == "200"){this.router.navigate([`home`])}else {this.message = res.status}},
      error: (e:any) => {if (e){this.message = "An error has occurred."}}})
  }

  ngOnDestroy(){
    this.onDestroy$.next(true)
  }


}
