import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, of} from "rxjs";
import {ɵEmptyOutletComponent} from "@angular/router";
import {AsyncPipe, NgClass} from "@angular/common";

export interface ITabItem {
  id: string | number;
  title: string | Observable<string>;
  disabled?: boolean | Observable<boolean>;
  hidden?: boolean | Observable<boolean>;
  content?: string
}

type IShowTabFn<T extends string | number> = (tab: T) => Observable<boolean>;
type ICanOpenFn = () => Observable<boolean>;

function isNullOrUndefined<T>(value: T | undefined | null): value is null | undefined {
  return value === null || value === undefined;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    ɵEmptyOutletComponent,
    AsyncPipe,
    NgClass
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input({ required: true })
  set tabs(items: ITabItem[]) {
    this.tabs$$.next(items);
  }
  private tabs$$ = new BehaviorSubject<ITabItem[]>([]);
  public readonly tabs$ = this.tabs$$.asObservable();

  @Input() set activeTabId(tabId: number | string) {
    this.activeTabId$$.next(tabId);
  }
  private activeTabId$$ = new BehaviorSubject(this.tabs$$.value[0]?.id);
  public activeTabId$ = this.activeTabId$$.asObservable();

  @Output() changeActiveTabIdEvent = new EventEmitter();


  public readonly activeTab$ = combineLatest([this.activeTabId$$, this.tabs$$]).pipe(
    map(([activeTabId, tabs]) => this.getIndexByTab(activeTabId ?? null, tabs)),
  );

  public activeTabsId(tabId: number | string) {
    console.log('#mi', tabId)
    this.activeTabId$$.next(tabId);
    this.changeActiveTabIdEvent.emit(tabId);
  }

  private getIndexByTab(id: number | string | null, tabs: ITabItem[]): ITabItem | null {
    console.log('#mi',tabs.find((t) => t.id === id))
    return tabs.find((t) => t.id === id) ?? null;
  }
}
