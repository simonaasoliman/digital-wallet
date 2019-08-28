import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'digital Wallet';
  failed: Boolean = false;
  success: Boolean = false;
  constructor( private cookieService: CookieService,
  				private router: Router
   ) { 
  	const cookieExists: boolean = cookieService.check('visited');
  	if(!cookieExists){
  		this.cookieService.set( 'visited', 'true' );
  		this.router.navigate(['/signup'])

  	}
  }
}
