import {ParamMap, Params, UrlSegment, UrlTree} from '@angular/router';
import {Url as _Url_, UrlSegmentStrictGroup} from './models';


export class Url implements _Url_ {

  public readonly full: string;

  public constructor(private tree: UrlTree) {
    this.full = tree.toString();
  }

  public get basePath(): string | undefined {
    return this.getPath(0);
  }

  public get paths(): string[] {
    return this.segments.map(({path}: UrlSegment) => path);
  }

  public get segments(): UrlSegment[] {
    return this.getSegments('primary');
  }

  public get fragment(): string | null {
    return this.tree.fragment;
  }

  public get queryParamMap(): ParamMap {
    return this.tree.queryParamMap;
  }

  public get queryParams(): Params {
    return this.tree.queryParams;
  }

  public getPath(index: number): string | undefined {
    return this.getSegmentPath(index);
  }

  private getSegments(groupName: string): UrlSegment[] {
    const group: UrlSegmentStrictGroup = (
      this.tree.root.children[groupName] as UrlSegmentStrictGroup
    );
    return group && group.segments || [];
  }

  private getSegmentPath(
    index: number,
    segments: UrlSegment[] = this.segments,
  ): string | undefined {
    const segment: UrlSegment | undefined = segments[index] as UrlSegment | undefined;
    return segment && segment.path;
  }

}
