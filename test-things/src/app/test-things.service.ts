import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestThingsService {
  mockHttpClient = {
    get: of('YES')
  };

  constructor(private http: HttpClient) { }

  testHttpRequest(): Observable<string> {
    return this.mockHttpClient.get;
  }
}
