import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InfiniteScrollCustomEvent} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar}
  from '@ionic/angular/standalone';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll,IonInfiniteScrollContent, IonProgressBar]
})
export class StatsPage implements OnInit {

  constructor(private http: HttpClient) { }

  items: string[] = [];
  public stats_imgs: any = [];
  public team: any = [];
  public stats_color: any = ["primary", "secondary", "tertiary", "success", "warning", "danger", "medium"];
  public url:string = "https://proyecto-final-pokemon.web.app/"


  ngOnInit() {
    this.http.get(  this.url + 'stats_and_team').subscribe((response) => {
      this.stats_imgs = response;
      console.log( "respuesta de api estadistnicas" + this.stats_imgs);
      console.log(this.stats_imgs);
    });

    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 10; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);

}

}