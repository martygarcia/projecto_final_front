
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as Icons from 'ionicons/icons';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import {Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent,
  IonProgressBar}
  from '@ionic/angular/standalone';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [ IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent,
    IonProgressBar ,RouterLink, RouterLinkActive ,HttpClientModule],
})
export class AppComponent implements OnInit {

  public log_button:string = 'true';
  public data_login!:any;
  public appPages = [
    { title: 'Game', url: '/home', icon: 'game-controller' },
    { title: 'Team', url: '/team', icon: 'bag-remove' },
    { title: 'Estadisticas', url: '/stats', icon: 'people' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor( @Inject(DOCUMENT) public document: Document ,public auth: AuthService, private http: HttpClient, ) { 
    addIcons( Icons );
  }

  public user: any;
  // public url:string = "https://proyecto-final-pokemon.web.app/"
  public url:string = "http://localhost:3001/"


  ngOnInit() {


    this.auth.user$.subscribe(data => {
      this.user = data
      console.log('user', this.user);

      this.loadUser()
      // createUser();
    });
  }


  loadUser() {
    this.http.get( this.url + 'users/' + this.user.email).subscribe((response:any) => {
      console.log( response);
      console.log(this.user.email);
    });
  }
  logout() {
    this.auth.logout({ 
      logoutParams: {
        returnTo: this.document.location.origin 
      }
    });

}
}
