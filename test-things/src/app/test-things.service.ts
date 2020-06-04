import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {delay, dematerialize, materialize, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestThingsService {
  mockHttpClient = {
    get: of('YES').pipe(
      materialize(),
      delay(3000),
      dematerialize(),
      tap(console.log)
    )
  };

  constructor(private http: HttpClient) {
  }

  testHttpRequest(): Observable<string> {
    return this.mockHttpClient.get;
  }
}
