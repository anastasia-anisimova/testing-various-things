import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PastebinService {

  public commonText = '123';

  private readonly pastebinUrl = "/api/pastebin";

  constructor(private readonly http: HttpClient) {
  }

  public getText() {
    return '!!!';
  }

  public getData(): Observable<any> {
    return this.http.get('https://reqres.in/api/users');
  }

  public getPastebin(): Promise<any> {
    return this.http.get(this.pastebinUrl)
      .toPromise()
      .then(response => (response as any).json().data)
  }

  public multipleNumbers(value: number): number {
    return value * 2;
  }
}
