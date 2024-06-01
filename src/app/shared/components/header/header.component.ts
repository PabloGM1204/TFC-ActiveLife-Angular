import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  /**
  * Input of the user to be displayed in the component.
  */
  @Input() user: any | undefined;

  constructor( private router: Router ) { }

  ngOnInit() {}

  /**
  * Redirects to the user's profile page.
  */
  onProfile(){
    this.router.navigate(['/profile'])
  }

}
