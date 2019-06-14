import {Component, NgZone} from '@angular/core';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {UrlChanges, UrlService} from 'ngx-url';
import {Url} from './url';

describe('UrlService', () => {

  let urlService: UrlService;

  let router: Router;

  let ngZone: NgZone;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [
      RouterTestingModule.withRoutes([
        {
          path: 'a',
          component: TestComponent,
        },
        {
          path: 'b',
          component: TestComponent,
        },
      ]),
    ],
  }));

  beforeEach(() => {
    urlService = TestBed.get(UrlService);
    router = TestBed.get(Router);
    ngZone = TestBed.get(NgZone);
  });

  it(
    'should be created',
    () => expect(urlService).toBeTruthy(),
  );

  it(
    'should be able to create a url state',
    () => expect(urlService.createState('/')).toEqual(jasmine.any(Url)),
  );

  it(
    'should track url changes (previous and current) and expose it in a stream',
    () => urlService.changes$.subscribe(testUrlChanges),
  );

  it(
    'should expose indirect access to url changes',
    () => testUrlChanges(urlService.changesValue),
  );

  it(
    'should update url changes on router navigation',
    fakeAsync(() => {
      ngZone.run(() => {
        router.navigateByUrl('a').then(() => {
          let {previous, current}: UrlChanges = urlService.changesValue;
          expect(previous.basePath).toBeUndefined();
          expect(current.basePath).toBe('a');
          router.navigateByUrl('b').then(() => {
            ({previous, current} = urlService.changesValue);
            expect(previous.basePath).toBe('a');
            expect(current.basePath).toBe('b');
          });
        });
      });
    }),
  );

});

function testUrlChanges({current, previous}: UrlChanges): void {
  expect(current).toEqual(jasmine.any(Url));
  expect(previous).toEqual(jasmine.any(Url));
}

@Component({template: ''})
class TestComponent { }
