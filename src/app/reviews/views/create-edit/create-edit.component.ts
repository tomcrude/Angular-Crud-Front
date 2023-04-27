import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {review} from '../../models/review'
import {ReviewService} from "../../services/services"
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import {Router} from '@angular/router';
import {createImg} from "../../../shared/utils/utils"

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class CreateEditComponent {

 constructor(private activeRoute: ActivatedRoute,private service:ReviewService,private router:Router){}
 
 onDestroy$: Subject<boolean> = new Subject()

 review:review = {
    title: null,
    description: null,
    img: null,
    user: null
 } 

 image:string = "https://static.vecteezy.com/system/resources/previews/005/217/482/non_2x/the-question-mark-in-a-circle-black-icon-vector.jpg"

 params:any = this.activeRoute.snapshot.paramMap.get('id');
 message:string | null = ""
 id:any
 token: any

 preview(e:any){
    this.image = URL.createObjectURL(e.target.files[0]);
    this.review.img = e.target.files[0]
 }

 async send()
 {
  this.message = null;
  const formdata = new FormData()

  this.id = localStorage.getItem("id")
  
  formdata.append("image", this.review.img)
  formdata.append("title", this.review.title)
  formdata.append("description", this.review.description)
  formdata.append("user", this.id)

  if (this.params == "0"){

    if (this.review.img == null){
      let file = await createImg(this.image,"null")
      formdata.append("image", file)
    }

    this.service.createReview(formdata).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if (res.status !== "201"){this.message = res.status}else{this.router.navigate([`review/${res.id}`])}},
      error: (e:any) => {if (e){this.message = "An error has occurred."}}})

  }
  else {

    let file = await createImg(this.image,"whitouthChange")

    this.token = localStorage.getItem("token")
    formdata.append('image', file)
    formdata.append('token', this.token)
    formdata.append("userId", this.review.user)

    this.service.editReview(formdata,this.params).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {if (res.status !== "200"){this.message = res.status}else{this.router.navigate([`review/${this.params}`])}},
        error: (e:any) => {if (e){this.message = "An error has occurred."}}})
  }
 }

 ngOnInit(){

  if (this.params != "0"){
    this.service.getReview(this.params).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if(res == null){this.router.navigate([`home`])}else{this.review = res; this.image = `http://localhost:4000/images/${res.id}-image.png`}},
      error: (e:any) => {if (e){this.message = "You must select an image."}}})
  }

}

 ngOnDestroy(){
  this.onDestroy$.next(true)
}

}
