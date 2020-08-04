import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {TestComponent} from "./test.component";
import {PastebinService} from "../pastebin.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ChildComponent} from "./child/child.component";
import {anything, instance, mock, verify, when} from "ts-mockito";

describe('TestComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let el: HTMLElement;
  let service: PastebinService;
  let mockedService: PastebinService;

  beforeEach(async(() => {
    const serviceStub = {commonText: '!!!'};
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [
        TestComponent,
        ChildComponent
      ],
      providers: [
        PastebinService
        // {
        //   provide: PastebinService,
        //   useValue: serviceStub
        // }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement.nativeElement;

      mockedService = mock(PastebinService);
      when(mockedService.getText()).thenReturn('www').thenReturn('second!');
     // when(mockedService.getText(true)).thenReturn('ttt');
      when(mockedService.getText(anything())).thenCall((isTesting: boolean): string => {
        return `${isTesting}`;
      });

      when(mockedService.commonText).thenReturn('text');
      service = instance(mockedService);

      // service = jasmine.createSpyObj('PastebinService', {
      //   getText: '!!!'
      // });

     // fixture.detectChanges();
    });
  }));

  it('test mockito mock', () => {
    expect(service).toBeTruthy();
    expect(service.getText()).toEqual('www')
    expect(service.getText()).toEqual('second!')
    expect(service.getText(true)).toEqual('true')
    expect(service.commonText).toEqual('text')
    verify(mockedService.getText()).called();
    verify(mockedService.commonText).atLeast(1);
  });

  it('test component interaction', () => {
    fixture.detectChanges();
    const button: HTMLElement = el.querySelector('.child');
    expect(button.textContent).toContain(component.text);
    button.click();
    expect(component.text).toBe('new');
    fixture.detectChanges();
    expect(button.textContent).toContain(component.text);
  });

  it('test async', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.text).toBe('!!!');
    });
  }));

  it('test fakeAsync', fakeAsync(() => {
    setTimeout(() => {
      component.text = service.getText();
    }, 3000);

    tick(3000);

    expect(component.text).toBe('!!!');
  }));

  it('test spy service', () => {
    expect(service.getText()).toBe('!!!');
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have text in template', () => {
    expect(component.text).toBe('123');
    expect(el.textContent).toContain(component.text);
    component.text = 'new text';
    fixture.detectChanges();
    expect(component.text).toBe('new text');
    expect(el.textContent).toContain(component.text);
  });
})
