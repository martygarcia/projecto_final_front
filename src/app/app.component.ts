
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import * as Icons from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [ RouterLink, RouterLinkActive ,IonicModule,HttpClientModule],
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
  constructor(private http: HttpClient) {
    addIcons( Icons );
  }

  ngOnInit() {

  }
}
