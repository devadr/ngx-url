import {ParamMap, Params, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';


export class UrlState {

  public readonly full: string;

  public constructor(private tree: UrlTree) {
    this.full = tree.toString();
  }

  public get baseSegmentPath(): string | undefined {
    return this.getSegmentPath(0);
  }

  public get segmentPaths(): string[] {
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

  public getSegmentPath(index: number): string | undefined {
    const segment: UrlSegment | undefined = this.segments[index] as UrlSegment | undefined;
    return segment && segment.path;
  }

  private getSegments(groupName: string): UrlSegment[] {
    const group: UrlSegmentGroup | undefined = this.tree.root.children[groupName];
    return group && group.segments || [];
  }

}
