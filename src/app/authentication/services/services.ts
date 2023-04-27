import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {auth} from "../models/auth"
import {environment} from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http:HttpClient) {}

  headers = {headers: new HttpHeaders({'Authorization': 'Basic ' + window.btoa(window.unescape(encodeURIComponent(environment.user + ':' + environment.password))),'Access-Control-Allow-Origin': "*"})}

  url:string = "https://docker-test-br2v.onrender.com/auth"

  createUser(data:auth){ return this.http.post(`${this.url}/register`,data,this.headers) }

  logIn(data:auth){ return this.http.post(`${this.url}/logIn`,data,this.headers) }


}
