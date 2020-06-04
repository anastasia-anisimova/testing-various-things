import {Component, OnInit} from '@angular/core';
import {TestThingsService} from "./test-things.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test-things';
  testString$: Observable<string>;

  constructor(private testThingsService: TestThingsService) {
  }

  ngOnInit() {
    this.testString$ = this.testThingsService.testHttpRequest();
  }
}
