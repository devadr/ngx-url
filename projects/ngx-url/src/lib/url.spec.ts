import {Component, NgZone} from '@angular/core';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Url, UrlChanges, UrlState} from 'ngx-url';


describe('Url', () => {

  let url: Url;
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
    url = TestBed.get<Url>(Url);
    router = TestBed.get<Router>(Router);
    ngZone = TestBed.get<NgZone>(NgZone);
  });

  it(
    'should be created',
    () => expect(url).toBeTruthy(),
  );

  it(
    'should be able to create a url state',
    () => expect(url.createState('/')).toEqual(jasmine.any(UrlState)),
  );

  it(
    'should track url changes (previous and current) and expose it in a stream',
    () => url.changes$.subscribe(testChanges),
  );

  it(
    'should expose direct access to url changes',
    () => testChanges(url.changesValue),
  );

  it(
    'should update url changes on router navigation',
    fakeAsync(() => {
      ngZone.run(() => {
        router.navigateByUrl('a').then(() => {
          let {previous, current}: UrlChanges = url.changesValue;
          expect(previous.baseSegmentPath).toBeUndefined();
          expect(current.baseSegmentPath).toBe('a');
          router.navigateByUrl('b').then(() => {
            ({previous, current} = url.changesValue);
            expect(previous.baseSegmentPath).toBe('a');
            expect(current.baseSegmentPath).toBe('b');
          });
        });
      });
    }),
  );

});

function testChanges({current, previous}: UrlChanges): void {
  expect(current).toEqual(jasmine.any(UrlState));
  expect(previous).toEqual(jasmine.any(UrlState));
}

@Component({template: ''})
class TestComponent { }
