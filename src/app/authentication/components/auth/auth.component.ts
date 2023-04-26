import { Component } from '@angular/core';
import { Input } from '@angular/core'
import {auth} from "../../models/auth"
import {Service} from "../../services/services"
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import {Router} from '@angular/router';
import {addTokens} from "../../../shared/utils/utils"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class AuthComponent {

  constructor(private service:Service,private router:Router){}

  @Input() title:string = ""
  @Input() button:string = ""
  @Input() linkText:string = ""

  onDestroy$: Subject<boolean> = new Subject()

  message:string | null = ""

  auth:auth = {
    username: "",
    password: "",
    verifyPassword: "",
    email: ""
  }

  send(){

    this.message = null;

    if (this.title === "Register")
    {
      if (this.auth.password != this.auth.verifyPassword){this.message = "Passwords do not match."}
      else
      {this.service.createUser(this.auth).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {if (res.status !== "201"){this.message = res.status}else{this.router.navigate(["logIn"])}},
        error: (e:any) => {if (e){this.message = "An error has occurred."}}
      })}
    }
    else
    {
      this.service.logIn(this.auth).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {if (res.status !== "200"){this.message = res.status}
        else{
            addTokens(res)
            this.router.navigate(["home"])
        }},
        error: (e:any) => {if (e){this.message = "An error has occurred."}}
      })
    }
  }

  ngOnDestroy(){
    this.onDestroy$.next(true)
  }

}
