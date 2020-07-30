import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {PastbinComponent} from "./pastbin.component";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {PastebinService} from "../pastebin.service";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('PastebinComponent', () => {
  /** variables */
  let fixture: ComponentFixture<PastbinComponent>;
  let component: PastbinComponent;
  let debugElement: DebugElement;
  let el: Element;
  let pastbineService;
  let mockPaste: any;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PastbinComponent
      ],
      providers: [
        PastebinService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastbinComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('div'));
    el = debugElement.nativeElement;
    pastbineService = fixture.debugElement.injector.get(PastebinService);

   // pastbineService = TestBed.get(PastebinService);

    mockPaste = [
      { id:1, title: "Hello world", language: "Ruby", paste: "puts 'Hello'" }];
    spy = spyOn(pastbineService, 'getPastebin').and.returnValue(mockPaste);
  });

  it('should have component instance', () => {
    expect(component).toBeTruthy();
  });
  it('should have title in template', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });
  it('should have table in template', () => {
    expect(el.innerHTML).toContain('table');
  });
})
