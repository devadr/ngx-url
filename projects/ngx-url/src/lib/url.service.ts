import {Injectable} from '@angular/core';
import {Router, RouterEvent, RoutesRecognized} from '@angular/router';
import {Url} from './url';
import {UrlChanges, UrlState} from 'ngx-url';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {createStream, Stream} from 'wrapped-stream';


@Injectable({
  providedIn: 'root',
})

export class UrlService {

  private readonly urlChanges: Stream<BehaviorSubject<UrlChanges>>;

  public constructor(private router: Router) {
    this.urlChanges = this.getUrlChangesStream();
    this.watchUrlChanges(this.urlChanges);
  }

  public get urlChanges$(): Observable<UrlChanges> {
    return this.urlChanges.$;
  }

  public get urlChangesValue(): UrlChanges {
    return this.urlChanges.source.value;
  }

  private static getUrlChanges(previous: UrlState, current: UrlState): UrlChanges {
    return {
      previous,
      current,
    };
  }

  public getUrlState(url: string): UrlState {
    return new Url(this.router.parseUrl(url));
  }

  private getUrlChangesStream(): Stream<BehaviorSubject<UrlChanges>> {
    const initialState: UrlState = this.getUrlState('');
    return createStream(
      new BehaviorSubject(UrlService.getUrlChanges(initialState, initialState)),
    );
  }

  private watchUrlChanges(stream: Stream<BehaviorSubject<UrlChanges>>): void {
    this.router.events
      .pipe(
        filter((e: RouterEvent) => e instanceof RoutesRecognized),
        map(({urlAfterRedirects}: RoutesRecognized) => UrlService.getUrlChanges(
          this.urlChangesValue.current,
          this.getUrlState(urlAfterRedirects),
        )),
      )
      .subscribe(stream.source);
  }

}
