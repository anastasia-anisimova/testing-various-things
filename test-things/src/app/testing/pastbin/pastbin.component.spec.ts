import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {PastbinComponent} from "./pastbin.component";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('PastebinComponent', () => {
  /** variables */
  let fixture: ComponentFixture<PastbinComponent>;
  let component: PastbinComponent;
  let debugElement: DebugElement;
  let el: Element;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PastbinComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastbinComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('div'));
    el = debugElement.nativeElement;
  })
})
