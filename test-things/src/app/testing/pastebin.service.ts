import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PastebinService {

  private readonly pastebinUrl = "api/pastebin";

  constructor(private readonly http: HttpClient) {
  }

  public getPastebin(): Promise<any> {
    return this.http.get(this.pastebinUrl)
      .toPromise()
      .then(response => (response as any).json().data)
  }
}
