import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {deleteTokens} from "../../../shared/utils/utils"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router:Router){}
  
  username = localStorage.getItem("username")

  logOut(){
    deleteTokens()
    this.router.navigate([`/`])
  }
}
