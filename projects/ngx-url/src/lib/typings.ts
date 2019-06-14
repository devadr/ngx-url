import {ParamMap, Params, UrlSegment, UrlSegmentGroup} from '@angular/router';

export type UrlSegmentStrictGroup = UrlSegmentGroup | undefined;

export interface UrlChanges {
  previous: UrlState;
  current: UrlState;
}

export interface UrlState {
  readonly full: string;
  segments: UrlSegment[];
  fragment: string | null;
  queryParamMap: ParamMap;
  queryParams: Params;
  paths: string[];
  basePath?: string;
  getPath(index: number): string | undefined;
}
