import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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

  constructor( private router: Router, private aunthSvc: AuthService ) { }

  ngOnInit() {}

  /**
  * Redirects to the user's profile page.
  */
  onProfile(){
    this.router.navigate(['/profile'])
  }

}
