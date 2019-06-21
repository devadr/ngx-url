import {Injectable} from '@angular/core';
import {Router, RouterEvent, RoutesRecognized} from '@angular/router';
import {UrlState} from './url-state';
// noinspection TypeScriptPreferShortImport
import {UrlChanges} from './typings';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {createStream, Stream} from 'wrapped-stream';


@Injectable({
  providedIn: 'root',
})

export class Url {

  private readonly changes: Stream<BehaviorSubject<UrlChanges>>;

  public constructor(private router: Router) {
    this.changes = this.getChangesStream();
    this.watchChanges(this.changes);
  }

  public get changes$(): Observable<UrlChanges> {
    return this.changes.$;
  }

  public get changesValue(): UrlChanges {
    return this.changes.source.value;
  }

  private static generateChanges(previous: UrlState, current: UrlState): UrlChanges {
    return {
      previous,
      current,
    };
  }

  public createState(url: string): UrlState {
    return new UrlState(this.router.parseUrl(url));
  }

  private getChangesStream(): Stream<BehaviorSubject<UrlChanges>> {
    const initialState: UrlState = this.createState('');
    return createStream(
      new BehaviorSubject(Url.generateChanges(initialState, initialState)),
    );
  }

  private watchChanges(stream: Stream<BehaviorSubject<UrlChanges>>): void {
    this.router.events
      .pipe(
        filter((e: RouterEvent) => e instanceof RoutesRecognized),
        map(({urlAfterRedirects}: RoutesRecognized) => Url.generateChanges(
          this.changesValue.current,
          this.createState(urlAfterRedirects),
        )),
      )
      .subscribe(stream.source);
  }

}
