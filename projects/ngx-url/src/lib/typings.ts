import {UrlState} from './url';

export interface UrlChanges {
  previous: UrlState;
  current: UrlState;
}
