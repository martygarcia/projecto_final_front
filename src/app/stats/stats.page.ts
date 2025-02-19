import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InfiniteScrollCustomEvent} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonBadge, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar}
  from '@ionic/angular/standalone';
  import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonBadge,IonInfiniteScroll,IonInfiniteScrollContent, IonProgressBar]
})
export class StatsPage implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public items: string[] = [];
  public stats: any = [];
  public team: any = [];
  public stats_color: any = ["primary", "secondary", "tertiary", "success", "warning", "danger", "medium"];
  public url:string = "https://prijecto-final-back-2.onrender.com/"
  // public url:string = "http://localhost:3001/"
  public user:any


  ngOnInit() {

    this.auth.user$.subscribe(data => {
      this.user = data
      console.log('user', this.user);

      this.loadUser()
      // createUser();
    });
    
    this.http.get(  this.url + 'stats_and_team/').subscribe((response) => {
      this.stats = response;
      console.log( "respuesta de api estadistnicas" + this.stats);
      console.log(this.stats);
    });

    this.generateItems();
  }

  loadUser() {
    this.http.get(  this.url + 'users/' + this.user.email).subscribe((response:any) => {
      console.log( response);
    });
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