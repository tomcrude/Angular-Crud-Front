import { Component } from '@angular/core';
import { Input } from '@angular/core'
import {Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewsComponent {

  constructor(private router:Router){}

  @Input() title:string = ""
  @Input() description:string = ""
  @Input() id:string = ""
  @Input() image:string = "loading.gif"


  reDirect(){
    window.scroll({top: 0})
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([`review/${this.id}`]);
  });
  }

}
