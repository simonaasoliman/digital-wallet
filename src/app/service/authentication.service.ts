import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { pluck, share, shareReplay, catchError } from 'rxjs/operators';

//models
import { User } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
	  providedIn: 'root',

})
export class AuthService {
     
    API_URL = ' http://localhost:3000';
	API_ENDPOINT_LOGIN = '/user';
	API_ENDPOINT_REFRESH = '/refresh';
	API_ENDPOINT_REGISTER = '/user';

	


    constructor(private http: HttpClient) {
    }
      
    public login(email:string, password:string ) {
    	let url = this.API_URL+'/user?email='+email+'&password='+password ;
        return this.http.get(url , httpOptions)
        .pipe(

	      catchError(this.handleError('login', 'user'))
	    );   
    		// this is just the HTTP call, 
            // we still need to handle the reception of the token
        shareReplay();
    }

	public signup (user: User): Observable<User> {
	  return this.http.post<User>(this.API_URL+this.API_ENDPOINT_REGISTER, user, httpOptions)
	    .pipe(

	      catchError(this.handleError('signup', user))
	    );
	}

	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			//result = "Invalid Information Entered!"
			return (result);
		};
	}
    
}
     