import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) {}

  url:string = "https://docker-test-br2v.onrender.com/auth"

  headers = {headers: new HttpHeaders(
    {
    
      'Authorization': 'Basic ' + window.btoa((environment.user + ':' + environment.password))
  })}

  getAllReviews(){return this.http.get(`${this.url}/getAllReviews`,this.headers)}

  getReview(id:string | null){return this.http.get(`${this.url}/getReview/${id}`,this.headers)}

  getUserReviews(user:string,review:string){return this.http.get(`${this.url}/getUserReviews/${user}/${review}`,this.headers)}

  createReview(data:any){return this.http.post(`${this.url}/createReview`,{headers: new HttpHeaders({
    'Authorization': 'Basic ' + window.btoa(environment.user + ':' + environment.password)
  }),body: data})}

  deleteReview(id:string,token:any,userId:string){return this.http.delete(`${this.url}/deleteReview/${id}`,{headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + window.btoa(environment.user + ':' + environment.password)
  }),body: JSON.stringify({token,id:userId}),})}

  editReview(data:any,id:string | null){return this.http.put(`${this.url}/editReview/${id}`,data,this.headers)}


}