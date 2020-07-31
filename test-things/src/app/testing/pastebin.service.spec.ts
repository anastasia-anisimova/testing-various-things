import {async, inject, TestBed} from '@angular/core/testing';

import {PastebinService} from "./pastebin.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const dummyUserListResponse = {
  data: [
    { id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
    { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' },
    { id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg' },
  ],
};

describe('PastebinService', () => {
  let service: PastebinService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('PastebinService', {
      multipleNumbers: 7,
      showMsg: 'wewe'
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PastebinService,
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  //  service = TestBed.get(PastebinService);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should service create', inject([PastebinService], (ser: PastebinService) => {
    expect(ser).toBeTruthy();
    }
  ));

  it('test getData method, should return arr obj', () => {
    service.getData().subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpTestingController.expectOne('https://reqres.in/api/users');

    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('spy object method should have been called', () => {
    service.multipleNumbers(2);
   // console.log(service.showMsg());
    expect(service.multipleNumbers(2)).toBe(7);
    expect(service.multipleNumbers).toHaveBeenCalled();
   // expect(service.showMsg).toHaveBeenCalled();
  });

  it('should defined service props', () => {
    expect(service.multipleNumbers).toBeDefined();
   // expect(service.getff).toBeUndefined();
  });

  it('test createSpy method of Jasmine', () => {
    service.multipleNumbers = jasmine.createSpy('test createSpy').and.returnValue(1);
   // expect(service.multipleNumbers()).toEqual(1);
  });

  it('spy service multipleNumbers method should return 7', () => {
  //  service.multipleNumbers.and.returnValue(6);
//    expect(service).toBe(7);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('test multipleNumbers method', () => {
    const spy = spyOn(service, 'multipleNumbers').and.callThrough();
    let a = service.multipleNumbers(2);
    let b = service.multipleNumbers(3);

    expect(a).toEqual(4);
    expect(b).toEqual(6);
    expect(service.multipleNumbers).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(2);
    expect(spy.calls.mostRecent().returnValue).toEqual(6);
    expect(spy.calls.allArgs()).toEqual([[2], [3]]);
  });



});
