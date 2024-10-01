import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {ITabItem, TabsComponent} from "./components/tabs/tabs.component";
import {NgClass} from "@angular/common";

export enum tabsEnum {
  gos,
  bis,
  buh,
  ack
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TabsComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public tabs: {tabs: ITabItem[], active: tabsEnum} = {
    tabs: [{
      title: 'Бухгалтерия',
      id: 1,
      content: 'This is some placeholder content the 1'
    },
      {
        title: 'Госзакупки',
        id: 2,
        content: 'This is some placeholder content the 2'
      },
      {
        title: 'Бизнес-карта',
        id: 3,
        content: 'This is some placeholder content the 3'
      },
      {
        title: 'Эквайринг',
        id: 4,
        content: 'This is some placeholder content the 4'
      }],
    active: 1,
  }

  private getIndexByTab(id: string | number): ITabItem | null {
    return this.tabs.tabs.find((t) => t.id === id) ?? null;
  }

  public activeTab() {
return this.tabs.active;
  }

  public activeTabId(id: string | number) {
    this.tabs.active = id as any;
  }
}
