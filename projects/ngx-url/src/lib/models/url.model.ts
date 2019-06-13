import {ParamMap, Params, UrlSegment} from '@angular/router';

export interface Url {
  readonly full: string;
  segments: UrlSegment[];
  queryParamMap: ParamMap;
  queryParams: Params;
  paths: string[];
  basePath?: string;
  getPath(index: number): string | undefined;
}