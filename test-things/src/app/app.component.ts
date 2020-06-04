import {Component, OnInit} from '@angular/core';
import {TestThingsService} from "./test-things.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, flatMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-things';
  testString$: Observable<string>;

  private refreshSubj = new Subject<void>();

  constructor(private testThingsService: TestThingsService) {
  }

  ngOnInit() {
    this.testString$ = this.refreshSubj.pipe(
      debounceTime(250),
      flatMap(() => this.testThingsService.testHttpRequest()),
    );
  }

  setInitData() {
    //this.testString$ = this.testThingsService.testHttpRequest()
    this.refreshSubj.next();
  }
}
