import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {User} from "../models/user";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser: User = this.authService.currentUser;
    if (currentUser && this.authService.logIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.authToken}`
        }
      });
    }
    return next.handle(request);
  }
}
