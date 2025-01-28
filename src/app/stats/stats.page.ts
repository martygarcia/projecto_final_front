import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {InfiniteScrollCustomEvent} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsPage implements OnInit {

  constructor(private http: HttpClient) { }

  items: string[] = [];
  public stats_imgs: any = [];
  public team: any = [];
  public stats_color: any = ["primary", "secondary", "tertiary", "success", "warning", "danger", "medium"];

  ngOnInit() {
    this.http.get('http://localhost:3001/stats_and_team').subscribe((response) => {
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