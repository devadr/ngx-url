import {UrlState} from './url-state';

export interface UrlChanges {
  previous: UrlState;
  current: UrlState;
}
