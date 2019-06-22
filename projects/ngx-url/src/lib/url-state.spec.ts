import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';
import {UrlState} from 'ngx-url';


describe('UrlState', () => {

  let router: Router;

  let urlState1: UrlState;
  let urlState2: UrlState;

  function getUrlState(url: string): UrlState {
    return new UrlState(router.parseUrl(url));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    urlState1 = getUrlState('/');
    urlState2 = getUrlState('/a/b/c?d=e#f');
  });

  it('should create an instance', () => {
    expect(urlState1).toBeTruthy();
  });

  describe('basePath', () => {

    it(
      'should return undefined when url is `/`',
      () => expect(urlState1.baseSegmentPath).toBeUndefined(),
    );

    it(
      'should return first segment path in the url',
      () => expect(urlState2.baseSegmentPath).toBe('a'),
    );

  });

  describe('paths', () => {

    it(
      'should return empty array when url is `/`',
      () => expect(urlState1.segmentPaths.length).toBe(0),
    );

    it(
      'should return array of segment paths',
      // tslint:disable-next-line:no-magic-numbers
      () => expect(urlState2.segmentPaths.length).toBe(3),
    );

  });

  describe('fragment', () => {

    it(
      'should return null value when no fragment in the url',
      () => expect(urlState1.fragment).toBeNull(),
    );

    it(
      'should return current fragment specified in the url',
      () => expect(urlState2.fragment).toBe('f'),
    );

  });

  describe('queryParamMap', () => {

    it(
      'should return an empty map when no query params in the url',
      () => expect(urlState1.queryParamMap.keys.length).toBe(0),
    );

    it(
      'should return map of query params',
      () => expect(urlState2.queryParamMap.get('d')).toBe('e'),
    );

  });

  describe('queryParams', () => {

    it(
      'should return empty object when no query params in the url',
      () => expect(Object.keys(urlState1.queryParams).length).toBe(0),
    );

    it(
      'should return object with query params',
      () => expect(urlState2.queryParams.d).toBe('e'),
    );

  });

});
