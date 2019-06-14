import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TestBed} from '@angular/core/testing';
import {UrlState} from 'ngx-url';
import {Url} from './url';

describe('Url', () => {

  let router: Router;

  let url1: UrlState;
  let url2: UrlState;

  function getUrlData(url: string): UrlState {
    return new Url(router.parseUrl(url));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    url1 = getUrlData('/');
    url2 = getUrlData('/a/b/c?d=e#f');
  });

  it('should create an instance', () => {
    expect(url1).toBeTruthy();
  });

  describe('basePath', () => {

    it(
      'should return undefined when url is `/`',
      () => expect(url1.basePath).toBeUndefined(),
    );

    it(
      'should return first segment path in the url',
      () => expect(url2.basePath).toBe('a'),
    );

  });

  describe('paths', () => {

    it(
      'should return empty array when url is `/`',
      () => expect(url1.paths.length).toBe(0),
    );

    it(
      'should return array of segment paths',
      // tslint:disable-next-line:no-magic-numbers
      () => expect(url2.paths.length).toBe(3),
    );

  });

  describe('fragment', () => {

    it(
      'should return null value when no fragment in the url',
      () => expect(url1.fragment).toBeNull(),
    );

    it(
      'should return current fragment specified in the url',
      () => expect(url2.fragment).toBe('f'),
    );

  });

  describe('queryParamMap', () => {

    it(
      'should return an empty map when no query params in the url',
      () => expect(url1.queryParamMap.keys.length).toBe(0),
    );

    it(
      'should return map of query params',
      () => expect(url2.queryParamMap.get('d')).toBe('e'),
    );

  });

  describe('queryParams', () => {

    it(
      'should return empty object when no query params in the url',
      () => expect(Object.keys(url1.queryParams).length).toBe(0),
    );

    it(
      'should return object with query params',
      () => expect(url2.queryParams.d).toBe('e'),
    );

  });

});
