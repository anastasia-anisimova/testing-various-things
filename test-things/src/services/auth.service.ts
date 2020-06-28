import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../app/models/user";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshLoginStatus$ = new BehaviorSubject<void>(null);
  private readonly API_URL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) { }

  get logIn(): Observable<boolean> {
    return this.refreshLoginStatus$.pipe(
      map(() => !!localStorage.getItem('auth_token'))
    );
  }

  login(userData: User): Observable<any> {
    return this.http.post(this.API_URL + '/authenticate', userData).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this.refreshLoginStatus$.next();
        this.router.navigate(['/profile']);
      }),
    );
  }

  logout () {
    localStorage.removeItem('auth_token');
  }
}
